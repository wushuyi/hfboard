(function($){
	$(document).ready(function (){
		var ws = $.websocket("ws://localhost:8080/html5/ws");



		$('.boardCent').jScrollPane({
			autoReinitialise: true
		});
		$('.taskCent').jScrollPane({
			autoReinitialise: true
		});
		var taskJsp = $('.taskCent').data('jsp');

		var um = UM.getEditor('myEditor');
		var uName = window.prompt('欢迎,请输入一个屌炸天的昵称吧!', '我是逗比');
		if(!uName){
			uName = 'anonymous';
		}
		um.addListener( 'ready', function( editor ) {
			var $taskBar = $('.taskBar');
			var $toolbar = $('.edui-btn-toolbar', $taskBar);
			$toolbar.append('<div class="sumBtn">发送</div>');
			$toolbar.append('<div class="webcam"></div>');

			var msn = new Task($('#rightCent'), {
				userName: uName,
				ws: ws
			});

			msn.onMsgView = function(){
				setTimeout(function(){
					taskJsp.scrollToBottom();
				}, 300)
			}
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
	});
})(window.jQuery);