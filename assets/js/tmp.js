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
    //console.log(data);
    //var fileName = data.key;
    //var token = data.uploadToken;
    var fileName = "90e00db7b02a40279ab93cc053562a24";
    var token = "nym-Mch3cG-ndSeGCsrdqG6qe4PWFHbFXv3LWNTo:gBwoBNSXJvmVla-kwu6o8IoTrAM=:eyJzY29wZSI6Imh5cGhlbiIsInNhdmVLZXkiOiI5MGUwMGRiN2IwMmE0MDI3OWFiOTNjYzA1MzU2MmEyNCIsImRlYWRsaW5lIjoxNDE2MjIyMDc1fQ==";

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




$.ajax({
    url: "http://localhost/canvastest/assets/image/beastie.png",
    type: "GET",
    cache: false,
    contentType: null,
    processData: false,
    forceSync: false,
    success: function(data){
       console.log(data);
    },
    error: function(){
        console.log(arguments);
    }
});

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost/canvastest/assets/image/beastie.png', true);
request.responseType = 'arraybuffer';

request.addEventListener('readystatechange', function() {
    if (request.readyState === 4) { // readyState DONE
        var data = request.response;
        var byteArray = new Uint8Array(data);
        var blob = new Blob( [ byteArray ], { type: "image/png" });
        var imageUrl = window.URL.createObjectURL( blob );
        console.log(imageUrl);
    }
});
request.send();


var req = new XMLHttpRequest();
req.open('GET', "http://localhost/canvastest/assets/image/beastie.png");
req.responseType = "arraybuffer";
req.send();

req.onreadystatechange = function () {
    if (req.readyState === 4) {
        var buffer = req.response;
        var dataview = new DataView(buffer);
        console.log(dataview);
        //var ints = new Int32Array(buffer.byteLength / 4);
        //for (var i = 0; i < ints.length; i++) {
        //    ints[i] = dataview.getInt32(i * 4);
        //}
        //alert(ints[10]);
    }
};


var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
var oReq = new XMLHttpRequest();
oReq.open("GET", "http://localhost/canvastest/assets/image/beastie.png", true);
oReq.responseType = "arraybuffer";

oReq.onload = function(oEvent) {
    var blobBuilder = new BlobBuilder();
    blobBuilder.append(oReq.response);
    var blob = blobBuilder.getBlob("image/png");
    console.log(blob);
    // ...
};

oReq.send();

localforage.getItem('user_1_photo', function(a, data) {
    var util = {
        // 将 blob 生成 url 链接
        stream2Url: function(stream){
            var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
            return objectUrl;
        }
    };
    console.log(data);
    //var generatedFile = new File([data], 'test.png', {type: "image/png", lastModified: new Date()});
    var blobUrl = util.stream2Url(data);
    console.log(blobUrl);
});


localforage.getItem('userphoto', function);

//$('.tree').on('click', 'li', function(e){
//    e.stopPropagation();
//    var $self = $(this);
//    var $other = $self.siblings().find('div.expanded');
//    $other.removeClass('expanded').addClass('collapsed');
//    $other.siblings('ul').hide();
//});


$(window).on('beforeunload', function(){
    return '你确定要离开我了吗?';
});

$(window).off('beforeunload');


