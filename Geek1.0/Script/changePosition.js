
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
					for (var i = 0; i < intro.length; i++) {
						intro[i].getElementsByTagName("h2")[0].innerHTML = data.position[i];
						pos[i].innerHTML = data.tittle[i];
						for (var j = 0; j < data.request[i].length; j++) {
							var newli = document.createElement("li");
							intro[i].getElementsByTagName("ul")[0].appendChild(newli);
							newli.innerHTML = data.request[i][j];
						}
					}
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
	var list = document.getElementById("List");
	var position = list.getElementsByTagName("li");
	var myDiv = document.getElementById("content");
	var intro = myDiv.getElementsByTagName("div");
	function changeIt() {
		for (var i = 0; i < position.length; i++) {
		position[i].index = i;
		position[i].onclick = function() {
			for (var j = 0; j < intro.length; j++) {
				intro[j].className = "hide";
			}
			intro[this.index].className = "show";
		}
	}
	}
	changeIt();
}
