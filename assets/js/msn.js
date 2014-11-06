(function($){
	$(document).ready(function($){

	});
	function task($el, options){
		var self = this;
		var settings = {
			userName: 'anonymous',
			ws: undefined
		};
		if(typeof options === "object"){
			$.extend(settings, options);
		}
		self.options = settings;
		//self.receiveMsg = function(data){};
		self.el = $el;
		self.init();
	}
	task.prototype = {
		init: function(){
			var self = this;
			var options = self.options;
			options.ws.setEvents({
				task: function(e){
					//console.log(e);
					self.socket._receive(e.data);
				}
			});
			var socket = {
				_receive: function(data){
					self.socket.receive.call(this, data);
				},
				send: function(data){
					options.ws.send('task', data);
				},
				receive: function(data){
					console.log(data);
					self.receiveMsg(data);
				}
			};
			self.socket = socket;
			self.initView();
			self.initEvent();
		},
		initView: function(){
			var self = this;
			var options = self.options;
			var $el = self.el;

			var msgBox = $('.taskCent .scroll', $el);
			var userName = $('.taskTitle', $el).html(options.userName);
			var sendBox = $('#myEditor' , $el);
			var sendBtn = $('.taskBar .sumBtn', $el);
			self.pubEtc = {
				msgBox: msgBox,
				sendBox:  sendBox,
				sendBtn: sendBtn,
				userName: userName
			}
		},
		initEvent: function(){
			var self = this;
			var options = self.options;
			var $el = self.el;
			var pubEtc = self.pubEtc;
			pubEtc.sendBox.on("keypress", function(e){
				var thisSelf = $(this);
				if(e.shiftKey && e.keyCode == 13){
					var text = thisSelf.html();
					self.sendMsg(text);
					thisSelf.html('');
				}
			});
			pubEtc.sendBtn.on("click", function(e){
				var thisSelf = pubEtc.sendBox;
				var text = thisSelf.html();
				self.sendMsg(text);
				thisSelf.html('');
			});
		},
		sendMsg: function(text){
			var self = this;
			var options = self.options;
			var data = {
				text: text,
				user: options.userName
			};
			self.socket.send(data);
			self.msgView(data);
		},
		receiveMsg: function(data){
			var self = this;
			var options = self.options;
			//console.log('run');
			if(data.user != options.userName){
				self.msgView(data);
				self.onreceive(data);
			}
		},
		msgView: function(data){
			var self = this;
			var pubEtc = self.pubEtc;
			var taskView = '<p><span class="taskname">'+data.user+': </span><span class="tasktext">'+data.text+'</span></p>';
			pubEtc.msgBox.append(taskView);
		}
	};
	window.Task = task;
})(window.jQuery);