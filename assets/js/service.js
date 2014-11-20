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
	});
})(window.jQuery);