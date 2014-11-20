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
    // 工具集合
    var util = {
        // 将 blob 生成 url 链接
        stream2Url: function(stream){
            var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
            return objectUrl;
        }
    };

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }());



    function WebCam(){
        var self = this;
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

        var selfStream;

        var canvasloop;

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
            //console.log(stream);
            selfStream = stream;
            el.video.width = el.canvas.width = 500;
            el.video.height = el.canvas.height = 400;
            el.video.src= util.stream2Url(stream);
            $('#webcamCent .webcamBox').append(el.canvas);
            play();
        }

        function play(){
            function renderLoop() {
                el.context.drawImage(el.video, 0, 0, el.video.width, el.video.height);
                el.video.play();
                canvasloop = window.requestAnimationFrame(renderLoop);
            }
            renderLoop();
        }

        function pause(){
            el.video.pause();
            window.cancelAnimationFrame(canvasloop);
        }

        function stop(){
            selfStream.stop();
            $('#webcamCent .webcamBox').html('');
        }

        function getPhoto(){
            var base64Img = el.canvas.toDataURL("image/png");
            localStorage.img = base64Img;
            var originalLen = base64Img.length;
            base64Img = base64Img.split(';base64,')[1];
            var blob = window.base64ToBlob(base64Img, 'image/png');
            var generatedFile = new File([blob], "test.png", {type: "image/png", lastModified: new Date()});

            var newLen = blob.size;
            var blobUrl = util.stream2Url(generatedFile);
            console.log(blobUrl);
            console.log("原来大小: "+ originalLen +"; 新大小: " + newLen + "; 压缩率: " + newLen/originalLen + ";");
            console.log(newLen);
        }



        function mediaError(err){
            console.log(err);
        }

        self.test = getPhoto;
        self.play = play;
        self.pause = pause;
        self.stop = stop;
        self.getPhoto = getPhoto;
    }

    function webcam($el, options){
        return new WebCam($el, options);
    }

    $.extend({
        hfwebcam: webcam
    });

},this));