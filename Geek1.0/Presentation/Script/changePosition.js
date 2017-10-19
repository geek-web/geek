
function myAjax(){
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
        
        xhr.open('GET', "http://localhost/cat_catelist", true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var res = JSON.parse(xhr.responseText),
					data = res.data,	//获取到数据
					list = document.getElementById("List"),	//ul
					myDiv = document.getElementById("content"),
					len = data.length,
					s1 = '', s2 = '';
					console.log(data);
		
					// 技术类，运营，产品设计
					for(var i = 0; i < len; i++) {
						s1 = s1 + '<li>' + data[i].name + '</li>';
					}	
					list.innerHTML = s1;

					for(var i = 0; i < len; i++) {
						var s3 = '';	//定义空字符串，字符串拼接
						var request = data[i].jobs[0].require.split('$');
						for (var j = 0; j < request.length; j++) {
							s3 = s3 + '<li>' + request[j] + '</li>';	//选项卡的具体要求
						}	
						//获取每个选项卡职位要求并且保存到时s3中
						s2 = s2 + '<div class="hide"><h2>'+data[i].jobs[0].name +'</h2><ul>'+s3+'</ul></div>';
						//选项卡的完整内容
						//console.log(s3);  //字符串拼接
					}
					myDiv.innerHTML = s2;
					myDiv.getElementsByTagName('div')[0].className = '';

					//点击标签切换选项卡
					function changeIt() {
						var pos = list.getElementsByTagName("li"),	//获取到每个li标签
						intro = myDiv.getElementsByTagName("div");	//获取到每个选项卡盒子
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
		
}

//获取页面的标题
function getTittle() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open('GET', 'http://localhost/title_titlelist' ,true);
	xhr.send(null);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var data = JSON.parse(xhr.responseText);
				console.log(data);
				document.getElementById('joinUs').innerHTML = data.data.content;

			} else {
				alert('Fail!')
			}
		}
	}
}





window.onload = function() {
	myAjax();
	getTittle();
}


// {
// 	'data': [
// 		{'id' : 1, 'name' : '技术类'},
// 		{'id' : 2, 'name' : '运营类'},
// 		{'id' : 3, 'name' : '产品设计'}
// 	]
// }