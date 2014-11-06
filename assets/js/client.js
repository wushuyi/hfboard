(function($){
	$(document).ready(function (){
		var ws = $.websocket("ws://wushuyi.com:9001/socket");

		$('.boardCent').jScrollPane({
			autoReinitialise: true
		});
		$('.taskCent').jScrollPane({
			autoReinitialise: true
		});

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

		});

		var myBoard = new Board($("#hfBoard"), {
			type: "service",
			userName: uName,
			bgImg: './assets/images/width600.png',
			ws: ws
		});
		myBoard.penInit();
		myBoard.penEvent();

		window.myBoard = myBoard;

	});
})(window.jQuery);