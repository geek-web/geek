//动画函数
function move(obj,num1, num2, num3) {
	var obj = document.getElementById(obj);
	obj.style.left = parseInt(obj.style.left) + num1 + "px";
	obj.style.top = parseInt(obj.style.top) + num2 + "px";
	obj.style.fontSize = parseFloat(obj.style.fontSize) + num3 + "px";
} 	
//定时器
function animate() {
var timer = setInterval(function(){
	var operation = document.getElementById('operation');
	move('operation', 2, -1, -0.1);
	move('frontEnd', 2, 1, 0.1);
	move('design', -2, 1, 0.1);
	move('backStage', -2, -1, -0.1);
	if (parseInt(operation.style.left) == 400) {
	clearInterval(timer);
	var timer1 = setInterval(function(){
		move('operation', -2, -1, -0.1);
		move('frontEnd', 2, -1, -0.1);
		move('design', 2, 1, 0.1);
		move('backStage', -2, 1, 0.1);
		if (parseInt(operation.style.left) == 200) {
			clearInterval(timer1);
			var timer2 = setInterval(function() {
				move('operation', -2, 1, 0.1);
				move('frontEnd', -2, -1, -0.1);
				move('design', 2, -1, -0.1);
				move('backStage', 2, 1, 0.1);
				if (parseInt(operation.style.left) == 0) {
					clearInterval(timer2);
					var timer3 = setInterval(function(){
						move('operation', 2, 1, 0.1);
						move('frontEnd', -2, 1, 0.1);
						move('design', -2, -1, -0.1);
						move('backStage', 2, -1, -0.1);
						if (parseInt(operation.style.left) == 200 ) {
							clearInterval(timer3);
							animate();
						}
					}, 20);
				}
			}, 20)
		}
	}, 20)
	}
}, 20);
}
animate();	
