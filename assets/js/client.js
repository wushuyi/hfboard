(function ($) {
    $(document).ready(function () {
        var ws = $.websocket("ws://192.168.4.125:8080/html5/ws");
        var gData = {};
        window.ws = ws;

        function initSession1() {
            var $sessionBox1 = $("#session1");
            $sessionBox1.show();
            var $submit = $('.submit button', $sessionBox1);
            var $user = $('.user input', $sessionBox1);
            var $passwd = $('.passwd input', $sessionBox1);

            ws.setEvents({
                login: function (data) {
                    loginMsg(data);
                },
                createRoom: function (e) {
                    createRoomMsg(e);
                },
                inRoom: function (e) {
                    inRoomMsg(e);
                }
            });

            function loginMsg(data) {

                switch (data.code) {
                    case 1:
                        $sessionBox1.hide();
                        initSession2();
                        break;
                    case 2:
                        alert(data.desc);
                        break;
                    default:
                        alert('未知消息码, ' + data.desc);
                }
                $user.val('');
                $passwd.val('');
            }

            $submit.on('click', function (e) {
                var user = $.trim($user.val());
                var passwd = $.trim($passwd.val());

                if (!user) {
                    alert('请输入用户名!');
                    return false;
                }
                if (!passwd) {
                    alert('请输入密码!');
                    return false;
                }

                ws.send('login', {
                    username: user,
                    password: passwd
                });
                gData.user = user;
            });



            var $sessionBox2 = $("#session2");
            var myCreate = false;
            var inRoom = false;
            var $roomBox = $('.roomBox', $sessionBox2);
            var $createRoom = $('.createRoom', $sessionBox2);
            var $roomList = $('ul.roomList', $sessionBox2);
            $roomBox.jScrollPane({
                autoReinitialise: true
            });

            function createRoomMsg(data) {
                console.log(data);
                switch (data.code) {
                    case 1:
                        var data = data.data;
                        var roomInfo = "";
                        for (var key in data) {
                            var row = data[key];
                            roomInfo += '<li class="room" data-roomid="' + row.roomId + '"><span>房间名称: ' + row.roomName + '</span> <span>创建时间: ' + row.createDate + '</span> <span>房间ID: ' + row.roomId + '</span></li>';
                        }
                        $roomList.append(roomInfo);
                        if (myCreate) {
                            $sessionBox2.hide();
                            initSession3();
                            inRoom = true;
                        }
                        break;
                    case 2:
                        alert(data.desc);
                        break;
                    default:
                        alert('未知消息码, ' + data.desc);
                }
            }

            function inRoomMsg(data) {
                console.log(data);
                $sessionBox2.hide();
                if (inRoom) {
                    return false;
                }
                initSession3();
            }

            $roomList.on('click', 'li.room', function (e) {
                var self = $(this);
                var roomid = self.data('roomid');
                console.log(roomid);
                ws.send('inRoom', {roomId: roomid});
            });

            $createRoom.on('click', function (e) {
                window.roomName = window.prompt('欢迎,请输入一个屌炸天的房间名称吧!', '我是逗比');
                if (roomName) {
                    ws.send('createRoom', {roomName: roomName});
                    myCreate = true;
                }
            });
        }


        function initSession2() {
            var $sessionBox2 = $("#session2");
            $sessionBox2.show();
        }


        function initSession3() {
            var $sessionBox = $("#session3");
            $sessionBox.show();
            $('.boardCent').jScrollPane({
                autoReinitialise: true
            });
            $('.taskCent').jScrollPane({
                autoReinitialise: true
            });
            var taskJsp = $('.taskCent').data('jsp');

            var um = UM.getEditor('myEditor');

            um.addListener('ready', function (editor) {
                var $taskBar = $('.taskBar');
                var $toolbar = $('.edui-btn-toolbar', $taskBar);
                $toolbar.append('<div class="sumBtn">发送</div>');
                $toolbar.append('<div class="webcam"></div>');

                var $hftaskEL = $('#rightCent');
                var hftask = $.hftask($hftaskEL, {
                    userName: gData.user,
                    ws: ws,
                    el: {
                        msgBox: $('.taskCent .scroll', $hftaskEL),
                        userName: $('.taskTitle', $hftaskEL),
                        sendBox: $('#myEditor', $hftaskEL),
                        sendBtn: $('.taskBar .sumBtn', $hftaskEL)
                    }
                });
                hftask.setOnView(function () {
                    setTimeout(function(){
                        taskJsp.scrollToBottom();
                    }, 500);
                });


                var $webcamCent = $('#webcamCent');
                var webcam;
                $('.taskBar .webcam', $hftaskEL).on('click', function () {
                    console.log('ok');
                    webcam = $.hfwebcam();
                    $('#popBox').show();
                    $webcamCent.show();
                });
                $('.pzBtn', $webcamCent).on('click', function () {
                    $('.cpBtn, .scBtn', $webcamCent).show();
                    $(this).hide();
                    webcam.pause();
                });
                $('.cpBtn', $webcamCent).on('click', function () {
                    $('.cpBtn, .scBtn', $webcamCent).hide();
                    $('.pzBtn', $webcamCent).show();
                    webcam.play();
                });
                $('.scBtn', $webcamCent).on('click', function () {
                    var imgBlob =  webcam.getPhoto();
                    $.hfupqiniublob(imgBlob,{
                        ws: ws,
                        type: 'image/png',
                        success: function(data){
                            webcam.stop();
                            $('#popBox').hide();
                            $webcamCent.hide();
                            $('.cpBtn, .scBtn', $webcamCent).hide();
                            $('.pzBtn', $webcamCent).show();
                            $('#myEditor').append('<img src="http://hyphen.qiniudn.com/'+data.key+'" />');
                        }
                    })
                });
            });


            var myBoard = $.hfboard($("#hfBoard"), {
                type: "service",
                bgImg: './assets/images/width600.png',
                jScrollPane: $('.boardCent'),
                ws: ws
            });
            //myBoard.pen();
            setTimeout(function () {
                myBoard.setStyle('lineCap', 'round');
                myBoard.setStyle('strokeStyle', '#DD4814');
            }, 100);

            $('.studyBoard').on('selectstart', function (e) {
                e.preventDefault()
            })
        }

        initSession1();


        $(window).on('beforeunload', function () {
            return '你确定要离开我了吗?';
        });


        (function ($, Cloopen, ws) {
            ws.setEvents({
                voip: function (data) {
                    onVoipMsg(data);
                }
            });
            $('.soundBtn').on('click', function (e) {
                // 发送获取语音通话token请求
                //$("#idvideophone").css('left', '50%');
                ws.send('voip', {});
            });

            function onVoipMsg(data){
                console.log(data);


                /*设置为debug模式*/
                Cloopen.debug();

                /*设置为强制登录模式*/
                Cloopen.forceLogin();

                /*以voip账号和密码登录的方式初始化*/
                Cloopen.initByUser('idvideophone'//swf对应的id
                    , initCallBack//初始化时自定义fun
                    , notifyCallBack//显示通知的自定义fun
                    , data.data[0].voip//voip子账号
                    , data.data[0].password//voip子账号密码
                );

                function initCallBack(){

                }

                /*Cloopen显示事件回调通知的自定义函数*/
                function notifyCallBack(doFun, msg) {
                    if (doFun == 'invited') {
                        // 发起呼叫成功事件
                        console.log('发起呼叫成功事件');
                    }
                    else if (doFun == 'invitefailed') {
                        // 发起呼叫失败事件
                        console.log('发起呼叫失败事件');
                    }
                    else if (doFun == 'accepted') {
                        // 对端应答事件
                        console.log('对端应答事件');
                    }
                    else if (doFun == 'ringing') {
                        // 来电事件
                        console.log('来电事件，号码:' + msg);
                    }
                    else if (doFun == 'onHangup') {
                        // 挂机事件
                        if (msg == 'normal') {
                            console.log('挂机事件: 本端正常挂机');
                        }
                        else if (msg == 'byed') {
                            console.log('挂机事件: 对端正常挂机');
                        }
                        else if (msg == 'rejected') {
                            console.log('挂机事件: 对端拒接');
                        }
                        else if (msg == 'unallocated') {
                            console.log('挂机事件: 呼叫号码为空号');
                        }
                        else if (msg == 'noresponse') {
                            console.log('挂机事件: 呼叫无响应');
                        }
                        else if (msg == 'noanswer') {
                            console.log('挂机事件: 对方无应答');
                        }
                        else {
                            console.log('挂机事件: ' + msg);
                        }
                    }
                    else {
                        // 其他未知事件
                        console.log(msg);
                    }
                }

                /*未连接状态*/
                Cloopen.when_idle(function () {
                    console.log('未连接...');
                });

                /*正在连接服务器注册*/
                Cloopen.when_connecting(function () {
                    console.log('正在连接服务器注册...');
                });

                /*已经注册登录*/
                Cloopen.when_connected(function () {
                    console.log('通话准备就绪！');
                    if(data.data[1].voip != "82669500000002"){
                        Cloopen.invitetel(data.data[1].voip);
                    }
                    //$(".step1").show();
                    //$(".step2").hide();
                    //$(".step3").hide();
                    //$(".step4").hide();
                    //document.getElementById("landcall").disabled = false;
                    //document.getElementById("voipcall").disabled = false;
                });

                /*正在呼出*/
                Cloopen.when_outbound(function () {
                    console.log('正在呼出...');
                    //$(".step3").show();
                    //$(".step1").hide();
                });

                /*有呼入*/
                Cloopen.when_inbound(function () {
                    console.log('有电话呼入...');
                    //$(".step2").show();
                    //$(".step1").hide();
                    //$(".step3").hide();
                    //$(".step4").hide();
                });

                /*通话中*/
                Cloopen.when_active(function () {
                    console.log('通话中...');
                    //stopCount();
                    //timedCount();
                    //$(".step4").show();
                    //$(".step1").hide();
                    //$(".step2").hide();
                    //$(".step3").hide();
                });

            }
        })(window.jQuery, window.Cloopen, ws);

    });
})(window.jQuery);