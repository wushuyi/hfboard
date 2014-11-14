(function($){
	$(document).ready(function (){
		//var ws = $.websocket("ws://192.168.4.101:8080/html5/ws");
		//var wsUrl = "ws://" + location.host + "/html5/ws";
		//var ws = $.websocket(wsUrl);

		var ws = $.websocket("ws://localhost:8080/html5/ws");
		window.ws = ws;

		function initSession1(){
			var $sessionBox1 = $("#session1");
			$sessionBox1.show();
			var $submit = $('.submit button', $sessionBox1);
			var $user = $('.user input', $sessionBox1);
			var $passwd = $('.passwd input', $sessionBox1);



			ws.setEvents({
				login: function(data){
					loginMsg(data);
				},
				createRoom: function(e){
					createRoomMsg(e);
				},
				inRoom: function(e){
					inRoomMsg(e);
				}
			});

			function loginMsg(data){

				switch (data.code){
					case 1:
						$sessionBox1.hide();
						initSession2();
						break;
					case 2:
						alert(data.desc);
						break;
					default:
						alert('未知消息码, '+ data.desc);
				}
				$user.val('');
				$passwd.val('');
			}

			$submit.on('click', function(e){
				var user = $.trim($user.val());
				var passwd =  $.trim($passwd.val());

				if(!user){
					alert('请输入用户名!');
					return false;
				}
				if(!passwd){
					alert('请输入密码!');
					return false;
				}

				ws.send('login', {
					username: user,
					password: passwd
				})
			});


			var $sessionBox2 = $("#session2");
			var myCreate = false;
			var inRoom = false;
			var $roomBox = $('.roomBox', $sessionBox2);
			var $createRoom = $('.createRoom', $sessionBox2);
			var $roomList = $('ul.roomList' ,$sessionBox2);
			$roomBox.jScrollPane({
				autoReinitialise: true
			});

			function createRoomMsg(data){
				console.log(data);
				switch (data.code){
					case 1:
						var data = data.data;
						var roomInfo = "";
						for(var key in data){
							var row = data[key];
							roomInfo+= '<li class="room" data-roomid="'+ row.roomId +'"><span>房间名称: '+ row.roomName +'</span> <span>创建时间: '+ row.createDate +'</span> <span>房间ID: '+ row.roomId +'</span></li>';
						}
						$roomList.append(roomInfo);
						if(myCreate){
							$sessionBox2.hide();
							initSession3();
							inRoom = true;
						}
						break;
					case 2:
						alert(data.desc);
						break;
					default:
						alert('未知消息码, '+ data.desc);
				}
			}
			function inRoomMsg(data){
				console.log(data);
				$sessionBox2.hide();
				if(inRoom){
					return false;
				}
				initSession3();
			}

			$roomList.on('click', 'li.room', function(e){
				var self = $(this);
				var roomid = self.data('roomid');
				console.log(roomid);
				ws.send('inRoom', {roomId: roomid});
			});

			$createRoom.on('click', function(e){
				window.roomName = window.prompt('欢迎,请输入一个屌炸天的房间名称吧!', '我是逗比');
				if(roomName){
					ws.send('createRoom', {roomName: roomName});
					myCreate = true;
				}
			});
		}


		function initSession2(){
			var $sessionBox2 = $("#session2");
			$sessionBox2.show();
		}



		function initSession3(){
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
			var uName = window.roomName || window.prompt('欢迎,请输入一个屌炸天的昵称吧!', '我是逗比');
			if(!uName){
				uName = 'anonymous';
			}
			um.addListener( 'ready', function( editor ) {
				var $taskBar = $('.taskBar');
				var $toolbar = $('.edui-btn-toolbar', $taskBar);
				$toolbar.append('<div class="sumBtn">发送</div>');
				$toolbar.append('<div class="webcam"></div>');

				var $hftaskEL = $('#rightCent');
				var hftask = $.hftask($hftaskEL, {
					userName: uName,
					ws: ws,
					el: {
						msgBox: $('.taskCent .scroll', $hftaskEL),
						userName: $('.taskTitle', $hftaskEL),
						sendBox: $('#myEditor' , $hftaskEL),
						sendBtn: $('.taskBar .sumBtn', $hftaskEL)
					}
				});
				hftask.setOnView(function(){
					taskJsp.scrollToBottom();
				});

				window.hftask = hftask;
			});

			var myBoard = $.hfboard($("#hfBoard"), {
				type: "service",
				userName: uName,
				bgImg: './assets/images/width600.png',
				ws: ws
			});
			myBoard.pen();
			setTimeout(function(){
				myBoard.setStyle('lineCap', 'round');
				myBoard.setStyle('strokeStyle', '#DD4814');
			}, 100);

			$('.studyBoard').on('selectstart', function(e){
				e.preventDefault()
			})
		}

		initSession1();
		var $webcamCent = $('#webcamCent');
		var webcam = $.hfwebcam();
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

		var base64Img = localStorage.img;
		var originalLen = base64Img.length;
		base64Img = base64Img.split(';base64,')[1];
		var blob = window.base64ToBlob(base64Img, 'image/png');
		var generatedFile = new File([blob], "test.png", {type: "image/png", lastModified: new Date()});
		localforage.setItem('test', blob, function(){
			console.log('ok');
		});
	});
})(window.jQuery);