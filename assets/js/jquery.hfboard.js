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
	function Board($el, options){
		var canvas,context,ws,socket,setting,el, control = {};
		var self = this;
		var defaults = {
			type: 'service',
			userName: 'anonymous',
			width: null,
			height: null,
			bgImg: null,
			ws: null
		};
		setting = $.extend( {} ,defaults, options);
		ws = setting.ws;
		el = $el;

		socket = {
			_receive: function(data){
				socket.receive.call(this, data);
			},
			send: function(data){
				ws.send('board', data);
			},
			receive: function(data){

				receiveDrawData(data);
			}
		};

		function init (){
			canvas = document.createElement('canvas');
			context = canvas.getContext("2d");
			ws.setEvents({
				board : function(e){
					if(!e.data){
						return false;
					}
					socket._receive(e.data);
				}
			});
			el.append(canvas);
			drawBackground(setting.bgImg);
		}

		function drawBackground(imgSrc){
			$('<img />').attr('src', imgSrc).on('load', function(e){
				var img = this;
				canvas.width = setting.width ||  img.width;
				canvas.height = setting.height || img.height;
				context.drawImage(img, 0, 0, setting.width ||  img.width, setting.height || img.height);
			});
		}

		function reInit(imgSrc){
			canvas.remove();
			el.append(canvas);
			drawBackground(imgSrc);
		}

		function setStyle(key, value){
			context[key] = value;
		}

		function penInit(){
			control.isDown = false;
		}

		function penEvent(){
			var drawData = {
				type: 'pen',
				event: null,
				offsetX: null,
				offsetY: null
			};
			el.on('mousedown.pen.board', function(e){
				control.isDown = true;
				drawData.event = 'down';
				drawData.offsetX = e.offsetX;
				drawData.offsetY = e.offsetY;
				penDraw(drawData);
			});
			el.on('mousemove.pen.board', function(e){
				if(!control.isDown){
					return false;
				}
				drawData.event = 'move';
				drawData.offsetX = e.offsetX;
				drawData.offsetY = e.offsetY;

				penDraw(drawData);
			});
			el.on('mouseup.pen.board mouseout.pen.board', function(e){
				if(!control.isDown){
					return false;
				}
				control.isDown = false;
				drawData.event = 'up';
				drawData.offsetX = e.offsetX;
				drawData.offsetY = e.offsetY;
				penDraw(drawData);
			});
		}


		function penDraw(drawData){
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
			sendDrawData(drawData);
		}
		function sendDrawData(drawData){
			socket.send(drawData);
		}

		function receiveDrawData(drawData){
			//console.log(drawData);
			drawData.remote = true;
			switch (drawData.type){
				case "pen":
					penDraw(drawData);
					break;
			}
		}

		self.init = init;
		self.drawBackground = drawBackground;
		self.reInit = reInit;
		self.pen = function(){
			penInit();
			penEvent();
		};
		self.setStyle = setStyle;

		self.init();
	}

	function hfboard($el, options){
		return new Board($el, options);
	}

	$.extend({
		hfboard: hfboard
	});
},this));