(function (plugin, window) {
	var factory = function($){
		return plugin($, window);
	};
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($,window,undefined){
	// 画板对象
	function Board($el, options){
		var self = this;
		var defaults = {
			type: 'service',
			userName: 'anonymous',
			width: null,
			height: null,
			bgImg: null,
			ws: null
		};
		if(typeof  options === "object"){
			$.extend(defaults, options);
		}
		self.options = defaults;
		self.el = $el;
		self.init();
	}
	Board.prototype = {
		init: function(){
			var self = this;
			var options = self.options;
			var $el = self.el;

			var canvas = document.createElement('canvas');
			var context = canvas.getContext("2d");

			$el.append(canvas);

			this.pubEtc = {
				canvas: canvas,
				context: context
			};

			options.ws.setEvents({
				board : function(e){
					self.socket._receive(e.data);
				}
			});
			var socket = {
				_receive: function(data){
					self.socket.receive.call(this, data);
				},
				send: function(data){
					options.ws.send('board', data);
				},
				receive: function(data){

				}
			};
			self.socket = socket;
			self.socket.receive = function(data){
				self.receiveDrawData(data);
			};
			self.drawBackground(options.bgImg);
		},
		drawBackground: function(imgSrc){
			var self = this;
			var options = self.options;
			var pubEtc = self.pubEtc;
			var context = pubEtc.context;
			var canvas = pubEtc.canvas;
			$('<img />').attr('src', imgSrc).on('load', function(e){
				var img = this;
				canvas.width = options.width ||  img.width;
				canvas.height = options.height || img.height;
				context.drawImage(img, 0, 0, options.width ||  img.width, options.height || img.height);
			});
		},
		reInit: function(imgSrc){
			var self = this;
			var options = self.options;
			var pubEtc = self.pubEtc;
			var $el = self.el;
			var control = this.penControl;
			var bgImg;
			if(!imgSrc){
				bgImg = options.bgImg;
			}else{
				bgImg = imgSrc;
			}
			$el.off('.board');
			pubEtc.canvas.remove();
			self.init();
			self.drawBackground(bgImg);
			self.penInit();
			self.penEvent();
		},
		penInit: function(){
			var self = this;
			self.penControl = {
				isDown: false
			};
		},
		penEvent: function(){
			var self = this;
			var options = self.options;
			var pubEtc = self.pubEtc;
			var $el = self.el;
			var control = this.penControl;
			$el.off('.board');

			$el.on('mousedown.pen.board', function(e){
				control.isDown = true;
				var drawData = {
					type: "pen",
					event: "down",
					userName: options.userName,
					offsetX : e.offsetX,
					offsetY : e.offsetY
				};
				self.penDraw(drawData);
			});
			$el.on('mousemove.pen.board', function(e){
				if(!control.isDown){
					return false;
				}
				var drawData = {
					type: "pen",
					event: "move",
					userName: options.userName,
					offsetX : e.offsetX,
					offsetY : e.offsetY
				};
				self.penDraw(drawData);
			});
			$el.on('mouseup.pen.board mouseout.pen.board', function(e){
				if(!control.isDown){
					return false;
				}
				control.isDown = false;
				var drawData = {
					type: "pen",
					event: "up",
					userName: options.userName,
					offsetX : e.offsetX,
					offsetY : e.offsetY
				};
				self.penDraw(drawData);
			});
			self.penSetStyle('lineCap', 'round');
			self.penSetStyle('strokeStyle', '#DD4814');
		},
		penSetStyle: function(key, value){
			var self = this;
			var pubEtc = self.pubEtc;
			var context = pubEtc.context;
			context[key] = value;
		},
		penDraw: function(drawData){
			var self = this;
			var options = self.options;
			var pubEtc = self.pubEtc;
			var control = self.penControl;
			var context = pubEtc.context;

			//console.log(drawData);
			switch (drawData.event){
				case "setStyle":

					break;
				case "down":
					context.beginPath();
					context.moveTo(drawData.offsetX, drawData.offsetY);
					break;
				case "move":
					context.lineTo(drawData.offsetX, drawData.offsetY);
					context.stroke();
					break;
				case "up":
					context.closePath();
			}
			if(drawData.remote){
				return false;
			}
			if(options.type == "service"){
				self.sendDrawData(drawData);
			}
		},
		sendDrawData: function(drawData){
			var self = this;
			var options = self.options;
			self.socket.send(drawData);
			self.onSend(drawData);
		},
		receiveDrawData: function(drawData){
			var self = this;
			var options = self.options;
			if(drawData.userName == options.userName){
				return false;
			}
			drawData.remote = true;
			self.penDraw(drawData);
			self.onreceive(drawData);
		},
		onSend: function(){},
		onreceive: function(){}
	};

	function hfboard($el, options){
		return new Board($el, options);
	}
	$.extend({
		hfboard: hfboard
	});
},this));