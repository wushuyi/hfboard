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
                msgBox: $('<div></div>'),
                sendBox: $('<div></div>'),
                sendBtn: $('<div></div>'),
                userName: $('<div></div>')
            },
            onView: function () {
            },
            onSend: function () {
            },
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
            msgView(taskData);
            options.onSend();
        }

        function msgView(taskData) {
            var el = options.el;
            var taskView = '<p><span class="taskname">' + taskData.user + ': </span><span class="tasktext">' + taskData.text + '</span></p>';
            el.msgBox.append(taskView);
            options.onView();
        }

        function receiveMsg(taskData) {
            if (taskData.user != options.userName) {
                msgView(taskData);
            }
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