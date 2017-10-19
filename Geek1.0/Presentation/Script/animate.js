
function toRightBottom(name) {
	var obj = document.getElementById(name);
	obj.style.left = parseInt(obj.style.left) + 2 + "px";
	obj.style.top = parseInt(obj.style.top) + 1 + "px";
}
function toRightTop(name) {
	var obj = document.getElementById(name);
	obj.style.left = parseInt(obj.style.left) + 2 + "px";
	obj.style.top = parseInt(obj.style.top) - 1 + "px";
}
function toLeftBottom(name) {
	var obj = document.getElementById(name);
	obj.style.left = parseInt(obj.style.left) - 2 + "px";
	obj.style.top = parseInt(obj.style.top) + 1 + "px";
}
function toLeftTop(name) {
	var obj = document.getElementById(name);
	obj.style.left = parseInt(obj.style.left) - 2 + "px";
	obj.style.top = parseInt(obj.style.top) - 1 + "px";
}
function toBigFontsize(name) {
	var obj = document.getElementById(name);
	obj.style.fontSize = parseFloat(obj.style.fontSize) + 0.1 + "px";
}
function toSmallFontsize(name) {
	var obj = document.getElementById(name);
	obj.style.fontSize = parseFloat(obj.style.fontSize) - 0.1 + "px";
}
function myAjax(url) {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
					var data = JSON.parse(xhr.responseText);
					var job = document.getElementById('job');
					var p = job.getElementsByTagName('p');
					for(var i = 0;i<data.position.length;i++){
						var pos = data.position[i];
						p[i].innerHTML = pos;
					}
				} else{
					alert("获取数据失败，错误代码：" + xhr.status);
				}
			}
		}
		xhr.open('get', url, true);
		xhr.send(null);
	}



window.onload = function() {
	myAjax('http://rapapi.org/mockjsdata/20615/inde?rand='+Math.random().toString());
	function frontEnd_offset() {
		var front = document.getElementById('frontEnd');
		var timer = setInterval(function() {
			toRightBottom('frontEnd');
			toBigFontsize('frontEnd');
			if (front.style.left == '200px') {
				clearInterval(timer);
				var timer1 = setInterval(function() {
				toRightTop('frontEnd');
				toSmallFontsize('frontEnd');
				if (front.style.left == '400px') {
					clearInterval(timer1);
					var timer2 = setInterval(function(){
						toLeftTop('frontEnd');
						toSmallFontsize('frontEnd');
						if (front.style.left == '200px') {
							clearInterval(timer2);
							var timer3 = setInterval(function(){
								toLeftBottom('frontEnd');
								toBigFontsize('frontEnd');
								if (front.style.left == '0px') {
									clearInterval(timer3);
									frontEnd_offset();
								}
							}, 20);
						}
					}, 20);
				}

		}, 20);
			}
		}, 20);
	}
	frontEnd_offset();		//前端

	function backStage_offset() {
		var back = document.getElementById('backStage');
		var timer = setInterval(function(){
			toLeftTop('backStage');
			toSmallFontsize('backStage');
			if (back.style.left == '200px') {
				clearInterval(timer);
				var timer1 = setInterval(function(){
					toLeftBottom('backStage');
					toBigFontsize('backStage');
					if (back.style.left == '0px') {
						clearInterval(timer1);
						var timer2 = setInterval(function(){
							toRightBottom('backStage');
							toBigFontsize('backStage');
							if (back.style.left == '200px') {
								clearInterval(timer2);
								var timer3 = setInterval(function(){
									toRightTop('backStage');
									toSmallFontsize('backStage');
									if (back.style.left == '400px') {
										clearInterval(timer3);
										backStage_offset();
									}
								}, 20);
							}
						}, 20);
					}
				}, 20);
			}
		}, 20);
	}
	backStage_offset();     //后台

	function operation_offset() {
		var oper = document.getElementById('operation');
		var timer = setInterval(function(){
			toRightTop('operation');
			toSmallFontsize('operation');
			if (oper.style.left == '400px') {
				clearInterval(timer);
				var timer1 = setInterval(function(){
					toLeftTop('operation');
					toSmallFontsize('operation');
					if (oper.style.left == '200px') {
						clearInterval(timer1);
						var timer2 = setInterval(function(){
							toLeftBottom('operation');
							toBigFontsize('operation');
							if (oper.style.left == '0px') {
								clearInterval(timer2);
								var timer3 = setInterval(function(){
									toRightBottom('operation');
									toBigFontsize('operation')
									if (oper.style.left == '200px') {
										clearInterval(timer3);
										operation_offset();
									}
								}, 20)
							}
						}, 20);
					}
				}, 20);
			}
		}, 20);
	}
	operation_offset();   	//运营

	function design_offset() {
		var de = document.getElementById('design');
		var timer = setInterval(function(){
			toLeftBottom('design');
			toBigFontsize('design');
			if (de.style.left == '0px') {
				clearInterval(timer);
				var timer1 = setInterval(function(){
					toRightBottom('design');
					toBigFontsize('design');
					if (de.style.left == '200px') {
						clearInterval(timer1);
						var timer2 = setInterval(function(){
							toRightTop('design');
							toSmallFontsize('design');
							if (de.style.left == '400px') {
								clearInterval(timer2);
								var timer3 = setInterval(function(){
									toLeftTop('design');
									toSmallFontsize('design');
									if (de.style.left == '200px') {
										clearInterval(timer3);
										design_offset();
									}
								}, 20);
							}
						}, 20);
					}
				}, 20);
			}
		}, 20);
	}
	design_offset();
}