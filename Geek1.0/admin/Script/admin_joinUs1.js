
function postAjax(url) {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					console.log('post is success');
				} else {
					console.log('post is fail');
				}
			}
		}
}


//获取标题
function getTittle() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open('GET', 'http://localhost/title_titlelist', true);
	xhr.send(null);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var data = JSON.parse(xhr.responseText);
				console.log('tittle has been done!');
				document.getElementById('_tittle').value = data.data.content;
				//这里是显示标题
			} else {
				console.log('tittle is wrong!');
			}
		}
	}
}
//获取选项卡
function getTab(){
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

        xhr.open('GET', "http://localhost/cat_catelist", true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var res = JSON.parse(xhr.responseText),
					data = res.data,	//获取到数据保存到data变量里
					list = document.getElementById("get_list"),	//ul
					len = data.length,
					s1 = '', s2 = '',s3 = '';
					var edit = document.getElementById('edit');

					for(var i = 0;i<len;i++ ) {
						var request = data[i].jobs[0].require.split('$').join('\n');   //报错
						s3 = s3 + '<div class="hide">'+
						'<input class="name" type="text" value="'+data[i].jobs[0].name+'" id="'+data[i].jobs[0].id+'">'+
						'<textarea class="remark" wrap="virtual">' + request + '</textarea>'+
						'<button class="position_confirm">保存</button>'+
						'<button class="delete" id="delete">修改</button></div>';
					} 

					edit.innerHTML = s3;
					edit.firstElementChild.className = 'show';
					console.log('Tab is done');
		
					// 技术类，运营，产品设计 li标签显示在页面上
					for(var i = 0; i < len; i++) {
						s1 = s1 + '<li id="'+ data[i].id +'">' + data[i].name + '</li>';
					}
								//获取ID
					list.innerHTML = s1 + '<li class="add">+</li>';
					
					var timer = setInterval(Edit, 1000);	//编辑
					var timer1 = setInterval(postTab, 500);
					var timer2 = setInterval(addPosition, 1000);
				} else {
					alert("Fail!");
				}
			}
		}
		
}


//切换职位的编辑
function Edit() {
		var doc = document;
		var list = doc.getElementById('get_list'),	
		li = list.getElementsByTagName('li'),	
		edit = doc.getElementById('edit'),
		e_div = edit.getElementsByTagName('div'),	
		openBox = doc.getElementById('open'),
		confirm = doc.getElementById('confirm'),
		close = doc.getElementById('close'),
		poskind = doc.getElementById('poskind'),
		input = edit.getElementsByTagName('input'),	
		textarea = edit.getElementsByTagName('textarea');	
		
			for (let i = 0; i < li.length-1; i++) {
				li[i].index = i;

				//切换职位需求
				li[i].onclick = function() {
					for (var j = 0; j < e_div.length; j++) {
						e_div[j].className = "hide";
					}
					e_div[this.index].className = "show";
			
				}

				//编辑职位分类
				li[i].ondblclick = function() {
					var that = this;	//绑定this的值,即 li[i]
					openBox.style.visibility = 'visible';
					poskind.value = this.innerHTML;  //使输入框的值为默认值
					//点击取消按钮
					close.onclick = function(){
						openBox.style.visibility = 'hidden';
					}
					//点击确认按钮
					confirm.onclick = function() {
						if (that.id) {
							postAjax('http://localhost/cat_update?id='+li[i].id+'&name='+poskind.value);
							console.log(li[i].name);
							openBox.style.visibility = 'hidden';
							li[that.index].innerHTML = poskind.value;
						} else {
							postAjax('http://localhost/cat_save?'+'name='+poskind.value);
							openBox.style.visibility = 'hidden';
							li[that.index].innerHTML = poskind.value;
						}
					}
				}

				//删除选项卡
				var Delete = e_div[i].getElementsByTagName('button')[1];
				Delete.index = i;
				Delete.onclick = function() {
					var r = window.confirm('确定要删除此页吗？');
					if (r == true) {
						postAjax('http://localhost/job_delete?id='+input[i].id);
						//var flag = postAjax('http://localhost/job_delete?id='+input[i].id);
						//alert(flag);
						// function postAjax_tab() {
						// 	var xhr;
						// 	if (window.XMLHttpRequest) {
						// 		xhr = new XMLHttpRequest();
						// 	}else{
						// 		xhr = new ActiveXObject("Microsoft.XMLHTTP");
						// 	}
						// 	xhr.open('POST','http://localhost/job_delete?id='+input[i].id , true);
						// 	xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
						// 	xhr.send();
						// 	xhr.onreadystatechange = function() {
						// 		if (xhr.readyState == 4 ) {
						// 			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						// 				console.log('delete is ok');
										//postAjax('http://localhost/cat_delete?id='+li[i].id);
						// 			}
						// 		} else {
						// 		console.log('post is fail');
						// 	}
						// }
						// postAjax_tab();
		// xhr.open('POST', url, true);
		// xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
		// xhr.send();	 //传入的参数就是serialize函数的返回值
// }

						var timer1 = setTimeout(postAjax('http://localhost/cat_delete?id='+li[i].id), 500);
						console.log('input'+input[i].id);
						console.log('li'+li[i].id);

						this.parentNode.parentNode.removeChild(this.parentNode);
						li[this.index].parentNode.removeChild(li[this.index]);
						console.log(this.index);
						e_div[0].className = 'show';
					} 
				}

			}
}

//增加职位
function addPosition() {
	var doc = document;
	edit = doc.getElementById('edit'),
	Oul = doc.getElementById('get_list');
	var add = Oul.lastElementChild;
	add.onclick = function() {
		var newDiv = doc.createElement('div'),
		newLi = doc.createElement('li'),
		that = this;
		newLi.id = '';
		newDiv.innerHTML = '<input class="name" type="text" id="" value="'+Math.random()+'">'+
				'<textarea class="remark" wrap="virtual"></textarea>'+
				'<button class="position_confirm">Done!</button>'+
				'<button class="delete" id="delete">Delete</button>';
		newDiv.className = 'hide';
		newLi.innerHTML = '双击编辑';
		edit.appendChild(newDiv);
		Oul.insertBefore(newLi, that);
	}
}


function postTittle() {
	var tittle = document.getElementById('_tittle');
	document.getElementById('tittle_confirm').onclick = function() {
	postAjax('http://localhost/title_update?id=1&content='+tittle.value);
	}
}

function postTab() {
	var doc = document;
	var tab = doc.getElementById('edit'),
	button = doc.querySelectorAll('.position_confirm'),
	button_de = doc.querySelectorAll('delete'),
	input = tab.getElementsByTagName('input'),
	textarea = tab.getElementsByTagName('textarea'),
	list = doc.getElementById('get_list'),
	li = list.getElementsByTagName('li'),
	poskind = doc.getElementById('poskind');
	
	//修改职位和职位需求
	for(let i = 0;i<button.length;i++) {
		button[i].onclick = function() {
			var request = textarea[i].value.split('\n').join('$');
				if (input[i].id) {
					console.log(li[i].id);
					var url = 'http://localhost/job_update?deptid='+ li[i].id +'&id='+input[i].id+'&name='+input[i].value+'&require='+request;
					postAjax(url);
					console.log('id:'+input[i].id); 
				} else {
					function  getid() {
						var xhr;
						if (window.XMLHttpRequest) {
							xhr = new XMLHttpRequest();
						} else{
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
						}
						xhr.open('GET', "http://localhost/cat_catelist", true);
						xhr.send(null);
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
									var data = JSON.parse(xhr.responseText);
									var len = data.data.length;
									var theID = data.data[len-1].id;
									alert(theID);
									var url = 'http://localhost/job_save?deptid='+theID+'&name='+input[i].value+'&require='+request;
									postAjax(url);
								} else {
									console.log('fail');
								}
							}
						}

					}
					getid();
				}
		}
	}
}		//修改每个选项卡的内容：小标题和职位的要求


//DOM加载完毕
window.onload = function() {
	getTittle();
	getTab();  
	postTittle();
	postTab();
	moveMark();
}




// id=1
// data = [
// 	{},		//选项卡1
// 	{},		//选项卡2
// 	{
// 		id:3,
// 		name: '产品设计',
// 		jobs:[{
// 			id:3,
// 			name:'程序猿',
// 			req:[{
// 				id:4,
// 				req:'要求1'
// 				},

// 				{
// 					id:5,
// 					req:'要求2'
// 				}
// 			]
// 		}]
// 	}	//选项卡3

// ]

