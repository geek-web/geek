
function myAjax(url){
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var data = JSON.parse(xhr.responseText);
					var list = document.getElementById("List");
					var pos = list.getElementsByTagName("li");
					var myDiv = document.getElementById("content");
					var intro = myDiv.getElementsByTagName("div");
					var len = data.tittle.length;
					var s1 = '', s2 = '';	
					// console.log(data.position);
					// console.log(data.tittle);
					// for (var i = 0; i < intro.length; i++) {
					// 	intro[i].getElementsByTagName("h2")[0].innerHTML = data.position[i];
					// 	pos[i].innerHTML = data.tittle[i];
					// 	for (var j = 0; j < data.request[i].length; j++) {
					// 		var newli = document.createElement("li");
					// 		intro[i].getElementsByTagName("ul")[0].appendChild(newli);
					// 		newli.innerHTML = data.request[i][j];
					// 	}
					// }
					
					for(var i = 0; i < len; i++) {
						s1 = s1 + '<li>' + data.tittle[i] + '</li>';
						list.innerHTML = s1;
					}	//获取选项卡的标签

					for(var i = 0; i < len; i++) {
						var s3 = '';	//定义空字符串，字符串拼接
						for (var j = 0; j < data.request[i].length; j++) {
							s3 = s3 + '<li>' + data.request[i][j] + '</li>'
						}	//获取选项卡的内容并且保存到时s3中
						s2 = s2 + '<div class="hide"><h2>'+data.position[i] +'</h2><ul>'+s3+'</ul></div>';
						//console.log(s3);  //字符串拼接
					}
					myDiv.innerHTML = s2;
					myDiv.getElementsByTagName('div')[0].className = '';


					function changeIt() {
						for (var i = 0; i < pos.length; i++) {
							pos[i].index = i;
							pos[i].onclick = function() {
							for (var j = 0; j < intro.length; j++) {
								intro[j].className = "hide";
							}
							intro[this.index].className = "show";
							}
						}
					}

					changeIt();

				} else {
					alert("请求数据失败，错误代码：" + xhr.status);
				}
			}
		}
		xhr.open('GET', url, true);
		xhr.send(null);
	}
window.onload = function() {
	myAjax("http://rapapi.org/mockjsdata/20615/joinus?rand="+Math.random().toString());
}
