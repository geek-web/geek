function getStyle(element, attr) {
	if (element.currentStyle) {
			return element.currentStyle[attr];
	} else {
		return getComputedStyle(element, false)[attr];	
		}
} 
		//获取属性 
var timer;
		//changeAttr(obj, {attr1:target1,attr2:target2}, fn);  //同时动画
	function changeAttr(obj, json, fn) {
		clearInterval(timer);	//清除定时器，防止定时器叠加
		timer = setInterval(function(){
			var flag = true;     	//检测是否所有的动画都停止

			for(var attr in json){			//for-in 用于遍历数组或者对象中的属性
			var value;
			if (attr == 'opacity') {
				value = Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else{
				value = parseInt(getStyle(obj, attr));
			}	//判断属性的类型

			var speed = (json[attr] - value)/4;	//计算速度

			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if (value != json[attr]) {
				flag = false;	//为执行完的动画继续执行动画

				if (attr == 'opacity') {
					obj.style[attr] = (value + speed)/100;
				}
				else {
					obj.style[attr] = value + speed +'px';
				}	
			}	

			if(flag == true) {
				clearInterval(timer);	//所有的运动执行完后再关闭定时器
				if (fn) {
					fn();
				}	//把fn放在这里是为了上一个动画结束后再进行下一个动画,
					//如果想同时进行多个动画，可以改变这个判断的位置
			}
		}
		}, 30);
	}


function moveMark() {
	var mark = document.getElementById('mark');
	var nav = document.getElementById('nav_list');
	var li = nav.getElementsByTagName('li');
	for(let i=0; li.length; i++) {
		li.onmouseover = function() {
			mark.style.display = 'block';
			if (mark.style.height == '50px') {
				changeAttr(mark, {'top':i*50});
			} else {
				changeAttr(mark, {'height':50});
				changeAttr(mark, {'top':i*50});
			}
		}
		// li[i].onmouseout = function() {
		// 	changeAttr(mark, {'height':0}, function(){
		// 		mark.style.height = 50 + 'px';
		// 		mark.style.display = 'none';
		// 	});
		// }
	}
}
moveMark();