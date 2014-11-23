/**
 * Created by Administrator on 2014/11/23.
 */
(function (plugin, window) {
    var factory = function($){
        return plugin($, window);
    };
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($,window,undefined){

    var util = {
        // 将 blob 生成 url 链接
        stream2Url: function(stream){
            var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
            return objectUrl;
        }
    };

    function Upqiniu(blobFile, options){
        var file,ws, fileType, token;
        file = blobFile;
        ws = options.ws;
        fileType = options.type;
        successCallback = options.success;

        ws.send('uploadToken', {});
        ws.setEvents({
            uploadToken: function(data){
                uploadToken(data);
            }
        });

        function uploadToken(data){
            console.log(data);
            var data = data.data;
            var fileName = data.key;
            var token = data.uploadToken;

            var generatedFile = new File([file], fileName, {type: fileType, lastModified: new Date()});

            var newLen = file.size;
            var blobUrl = util.stream2Url(generatedFile);
            console.log(blobUrl);

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
                success: function(data){
                    successCallback(data);
                },
                error: function(){
                    console.log(arguments);
                }
            });
        }
    }

    function hfupqiniu(file, options){
        return Upqiniu(file, options);
    }

    $.extend({
        hfupqiniublob: hfupqiniu
    });
},this));