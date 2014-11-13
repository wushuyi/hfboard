(function($){
	$(document).ready(function (){
		var ws = $.websocket("ws://wushuyi.com:9001/socket");

		$('.boardCent').jScrollPane({
			autoReinitialise: true
		});
		$('.panCent').jScrollPane({
			autoReinitialise: true
		});
		$('.taskCent').jScrollPane({
			autoReinitialise: true
		});

		//var um = UM.getEditor('myEditor');
		//var uName = window.prompt('欢迎,请输入一个屌炸天的昵称吧!', '我是逗比');
		//if(!uName){
		//	uName = 'anonymous';
		//}
		//um.addListener( 'ready', function( editor ) {
		//	var $taskBar = $('.taskBar');
		//	var $toolbar = $('.edui-btn-toolbar', $taskBar);
		//	$toolbar.append('<div class="sumBtn">发送</div>');
		//	$toolbar.append('<div class="webcam"></div>');
        //
		//	var msn = new Task($('#rightCent'), {
		//		userName: uName,
		//		ws: ws
		//	});
        //
		//});

		var myBoard = $.hfboard($("#hfBoard"), {
			type: "service",
			userName: 'test',
			bgImg: './assets/images/width600.png',
			ws: ws
		});
		myBoard.pen();
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

		var $taskCent = $('#taskCent');
		$('.close', $taskCent).on('click', function(e){
			$taskCent.hide();
		});
		$('.showTaskBtn').on('click', function(e){
			$taskCent.show();
		});

		$('#leftCent, #rightCent').on('selectstart', function(e){
			e.preventDefault()
		})
	});
})(window.jQuery);