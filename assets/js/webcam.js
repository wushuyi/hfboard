(function ($) {


    $(document).ready(function () {
    });

    function webcam($el, options){
        var self = this;
        var settings = {
            width: 500,
            height: 400
        };
        if(typeof options === "object"){
            $.extend(settings, options);
        }
        self.options = settings;
        self.el = $el;
        self.init();
    }
    webcam.prototype = {
        init: function(){
            console.log('run');
            var self = this;
            var options = self.options;
            var navigator = window.navigator;
            navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);

            if (!navigator.getUserMedia) {
                console.log('您的浏览器不支持 调用摄像头!')
                return;
            }

            function toObjectUrl(stream) {
                var toObjectUrl;
                if (window.URL) {
                    toObjectUrl = window.URL.createObjectURL(stream);
                } else {
                    toObjectUrl = stream;
                }
                return toObjectUrl;
            }
            console.log(navigator);
            navigator.getUserMedia({
                video: true,
                audio: true
            }, function(stream){
                var video = document.createElement('video');
                var canvas = document.createElement('canvas');
                var image = document.createElement('img');
                var ctlBtn = $('<button>拍照</button>')

                video.width = canvas.width = options.width;
                video.height = canvas.height = options.height;
                var context = canvas.getContext("2d");
                video.autoplay = true;
                video.src = toObjectUrl(stream);

                setInterval(function () {
                    context.drawImage(video, 0, 0, video.width, video.height);
                }, 1000 / 60);

                self.el.append(canvas).append(image).append(ctlBtn);
                ctlBtn.on('click', function (e) {
                    var poto = canvas.toDataURL();
                    var potoSrc = poto;
                    console.log(poto);
                    var blob = dataURLtoBlob(poto);
                    var bloburl = toObjectUrl(blob);
                    alert("照片大小:" + (blob.size / 1000) + "Kb.");
                    image.src = bloburl;
                    console.log(blob);
                });

                function cmpImg(imgSrc) {
                    var mincanvas = document.createElement('canvas');
                    mincanvas.width = options.width;
                    mincanvas.height = options.height;
                    var context = mincanvas.getContext("2d");
                    var img = new Image();
                    img.onload = function () {
                        context.drawImage(this, 0, 0, mincanvas.width, mincanvas.height);
                        var minImg = mincanvas.toDataURL();
                        console.log(minImg);
                    };
                    img.src = imgSrc;
                }
            }, function(){

            });
        }
    };
    window.Webcam = webcam;
})(window.jQuery);