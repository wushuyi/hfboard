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
        stream2Url: function(stream){
            var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
            return objectUrl;
        }
    };

    function WebCam(){
        (function(navigator){
            navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            if(!navigator.getUserMedia){
                alert('您的浏览器 不支持 webRTC 请更换浏览器!');
            }
        })(window.navigator);

        var el = {
            video: document.createElement('video'),
            canvas: document.createElement('canvas'),
            image: document.createElement('img'),
            ctlBtn: document.createElement('button')

        };
        el.context = el.canvas.getContext('2d');

        navigator.getUserMedia({
            video: {
                "mandatory": {
                    "minWidth": 500,
                    "maxWidth": 500,
                    "minHeight": 400,
                    "maxHeight": 400,
                    "maxFrameRate": 60
                }
            },
            audio: true
        }, mediaSuccess, mediaError);

        function mediaSuccess(stream){
            console.log(stream);
            el.video.width = el.canvas.width = 500;
            el.video.height = el.canvas.height = 400;
            el.video.autoplay = true;
            el.video.src= util.stream2Url(stream);
            setInterval(function(){
                el.context.drawImage(el.video, 0, 0, el.video.width, el.video.height);
            }, 1000/60);
            $('#webcamCent .webcamBox').append(el.canvas);
        }

        function mediaError(err){
            console.log(err);
        }

    }

    function webcam($el, options){
        return new WebCam($el, options);
    }

    $.extend({
        hfwebcam: webcam
    });
    $.hfwebcam();
},this));