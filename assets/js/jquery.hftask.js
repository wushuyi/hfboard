(function (plugin, window) {
    var factory = function ($) {
        return plugin($, window);
    };
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, window, undefined) {
    function Task($el, options) {
        // 初始化
        var self = this;
        var settings = {
            userName: 'anonymous',
            ws: {
                send: function () {
                },
                setEvents: function () {
                },
                getEvents: function () {
                }
            },
            el: {
                msgBox: null,
                sendBox: null,
                sendBtn: null,
                userName: null
            },
            onView: function () {
            },
            onSend: function () {
            }
        };
        if (typeof options === "object") {
            $.extend(settings, options);
        }
        settings.el.thisEl = $el;
        var options = settings;


        // socket 交互封装
        var socket = {
            _receive: function (data) {
                socket.receive.call(this, data);
            },
            send: function (data) {
                options.ws.send('task', data);
            },
            receive: function (data) {
                if (!data) {
                    return false;
                }
                receiveMsg(data);
            }
        };
        options.ws.setEvents({
            task: function (e) {
                if (!e.data) {
                    return false;
                }
                socket._receive(e.data);
            }
        });

        function init() {
            initView();
            initEvent();
        }

        function initView() {
            options.el.userName.html(options.userName);
        }

        function initEvent() {
            var el = options.el;
            console.log(el);
            el.sendBox.on("keypress", function (e) {
                var $sendBox = el.sendBox;
                if (e.shiftKey && e.keyCode == 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    var text = $sendBox.html();
                    sendMsg(text);
                    $sendBox.html('');
                }
            });
            el.sendBtn.on("click", function (e) {
                var $sendBox = el.sendBox;
                var text = $sendBox.html();
                sendMsg(text);
                $sendBox.html('');
            });
        }

        function sendMsg(text) {
            var taskData = {
                text: text,
                user: options.userName
            };
            socket.send(taskData);
            msgView(taskData, 'self');
            options.onSend();
        }

        function msgView(taskData, type) {
            var el = options.el;
            var taskView;
            if(type == 'self'){
                taskView = '<div class="chat_content_group self  ">' +
                '<img class="chat_content_avatar" src="'+'https://avatars1.githubusercontent.com/u/1024025?v=3&s=460'+'" width="40px" height="40px">' +
                '<p class="chat_nick">'+taskData.user+'</p>' +
                '<div class="chat_content ">'+ taskData.text +'</div>' +
                '</div>';
            }else if(type == "other"){
                taskView = '<div class="chat_content_group buddy  ">' +
                '<img class="chat_content_avatar" src="'+'https://avatars2.githubusercontent.com/u/25254?v=3&s=192'+'" width="40px" height="40px">' +
                '<p class="chat_nick">'+taskData.user+'</p>' +
                '<div class="chat_content ">'+ taskData.text +'</div>' +
                '</div>';
            }
            el.msgBox.append(taskView);
            options.onView();
        }

        function receiveMsg(taskData) {
            msgView(taskData, 'other');
        }

        self.options = options;
        self.setOnView = function (cb) {
            options.onView = cb;
        };
        self.setOnSend = function (cb) {
            options.onSend = cb;
        };
        init();
    }

    function task($el, options) {
        return new Task($el, options);
    }

    $.extend({
        hftask: task
    });

}, this));