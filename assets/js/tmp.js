ws.send('uploadToken', {});
ws.setEvents({
    uploadToken: function(data){
        uploadToken(data.data);
    }
});

var util = {
    // 将 blob 生成 url 链接
    stream2Url: function(stream){
        var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
        return objectUrl;
    }
};

function uploadToken(data){
    console.log(data);
    var fileName = data.key;
    var token = data.uploadToken;


    var base64Img = localStorage.img;
    var originalLen = base64Img.length;
    base64Img = base64Img.split(';base64,')[1];
    var blob = window.base64ToBlob(base64Img, 'image/png');
    var generatedFile = new File([blob], fileName, {type: "image/png", lastModified: new Date()});

    var newLen = blob.size;
    var blobUrl = util.stream2Url(generatedFile);
    console.log(blobUrl);
    console.log("原来大小: "+ originalLen +"; 新大小: " + newLen + "; 压缩率: " + newLen/originalLen + ";");

    var form = new FormData();
    form.append("file", generatedFile);
    form.append("token", token);

    $.ajax({
        url: "http://upload.qiniu.com/",
        type: "POST",
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        forceSync: false,
        success: function(){
            console.log(arguments);
        },
        error: function(){
            console.log(arguments);
        }
    });
}






//$('.tree').on('click', 'li', function(e){
//    e.stopPropagation();
//    var $self = $(this);
//    var $other = $self.siblings().find('div.expanded');
//    $other.removeClass('expanded').addClass('collapsed');
//    $other.siblings('ul').hide();
//});
