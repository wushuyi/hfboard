(function($){
	$(document).ready(function (){
		var ws = $.websocket("ws://192.168.4.125:8080/html5/ws");
		var gData = {};

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
			$('.panCent').jScrollPane({
				autoReinitialise: true
			});
			$('.taskCent').jScrollPane({
				autoReinitialise: true
			});

			var taskJsp = $('.taskCent').data('jsp');


			var myBoard = $.hfboard($("#hfBoard"), {
				type: "service",
				bgImg: './assets/images/width600.png',
				jScrollPane: $('.boardCent'),
				ws: ws
			});
			myBoard.pen();
			myBoard.ctlScroll();
			setTimeout(function(){
				myBoard.setStyle('lineCap', 'round');
				myBoard.setStyle('strokeStyle', '#DD4814');
			}, 100);
			$('.boardBar .penRed').on('click', function(){
				myBoard.setStyle('strokeStyle', '#DD4814');
			});
			$('.boardBar .penBlack').on('click', function(){
				myBoard.setStyle('strokeStyle', '#000000');
			});

			var um = UM.getEditor('myEditor');
			um.addListener( 'ready', function( editor ) {
				var $taskBar = $('.taskBar');
				var $toolbar = $('.edui-btn-toolbar', $taskBar);
				$toolbar.append('<div class="sumBtn">发送</div>');
				$toolbar.append('<div class="webcam"></div>');

				var $hftaskEL = $('#taskCent');
				var uName = "test";
				var hftask = $.hftask($hftaskEL, {
					userName: gData.user,
					ws: ws,
					el: {
						msgBox: $('.taskCent .scroll', $hftaskEL),
						userName: $('.taskTitle', $hftaskEL),
						sendBox: $('#myEditor' , $hftaskEL),
						sendBtn: $('.taskBar .sumBtn', $hftaskEL)
					}
				});
				hftask.setOnView(function(){
					setTimeout(function(){
						taskJsp.scrollToBottom();
					}, 500);
				});


				var $webcamCent = $('#webcamCent');
				var webcam;
				$('.taskBar .webcam', $hftaskEL).on('click', function(){
					webcam = $.hfwebcam();
					$('#popBox').show();
					$webcamCent.show();
				});
				$('.pzBtn',$webcamCent).on('click', function(){
					$('.cpBtn, .scBtn', $webcamCent).show();
					$(this).hide();
					webcam.pause();
				});
				$('.cpBtn',$webcamCent).on('click', function(){
					$('.cpBtn, .scBtn', $webcamCent).hide();
					$('.pzBtn', $webcamCent).show();
					webcam.play();
				});
				$('.scBtn', $webcamCent).on('click', function(){
					webcam.getPhoto();
				});
			});


			var $taskCent = $('#taskCent');
			$taskCent.data('isOpen', false);
			$('.close', $taskCent).on('click', function(e){
				$taskCent.hide();
				$taskCent.data('isOpen', false);
			});
			$('.showTaskBtn').on('click', function(e){
				var isOpen = $taskCent.data('isOpen');
				if(isOpen){
					$taskCent.hide();
					$taskCent.data('isOpen', false);
				}else{
					$taskCent.show();
					$taskCent.data('isOpen', true);
					setTimeout(function(){
						taskJsp.scrollToBottom();
					}, 1000);
				}
			});

			$('#leftCent, #rightCent').on('selectstart', function(e){
				e.preventDefault()
			});


			var $runTime = $('#titBar .runTime');
			var $closeBtn = $('#titBar .closeBtn');

			var titTime = {
				runTime: new Date().getTime(),
				oldTime: 0
			};
			function loopShowRunTime(){
				var nowTime = new Date().getTime();
				var min = (nowTime - titTime.runTime) / 1000 / 60;
				//console.log(min);
				min = parseInt(min);
				if(titTime.oldTime != min){
					$runTime.text(parseInt(min));
				}
			}
			setInterval(function(){
				loopShowRunTime();
			}, 5000);

			var $popBox = $('#popBox');
			var $sureCloseBox = $('.sureCloseBox', $popBox);
			var $ratyBox = $('.ratyBox', $popBox);
			var $remarkBox = $('.remarkBox', $popBox);

			$closeBtn.on('click', function(){
				$popBox.show();
				$sureCloseBox.show();
			});
			$('.cancel', $sureCloseBox).on('click', function(){
				$popBox.hide();
				$sureCloseBox.hide();
			});
			$('.end', $sureCloseBox).on('click', function(){
				$sureCloseBox.hide();
				$ratyBox.show();
			});
			$('.prevBtn', $ratyBox).on('click', function(){
				$ratyBox.hide();
				$sureCloseBox.show();
			});
			$('.nextBtn', $ratyBox).on('click', function(){
				$ratyBox.hide();
				$remarkBox.show();
			});

			$('.prevBtn' ,$remarkBox).on('click', function(){
				$remarkBox.hide();
				$ratyBox.show();
			});
			$('.nextBtn' ,$remarkBox).on('click', function(){
				$sureCloseBox.hide();
				$popBox.hide();
				$(window).off('beforeunload');
			});


			$(window).on('beforeunload', function(){
				return '你确定要离开我了吗?';
			});

			$(".ratyList .raty").raty({
				numberMax : 3,
				path: 'assets/js/libs/jquery.raty/images/',
				starOff : 'off.png',
				starOn  : 'on.png',
				hints: ['合格', '良好', '优良']
			});
		}

		initSession1();
	});
})(window.jQuery);