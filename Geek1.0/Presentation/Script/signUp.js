window.onload = function() {
	var userForm = document.getElementById("form");
	var input = userForm.getElementsByTagName("input");
	var p = userForm.getElementsByTagName("p");
	var button = document.getElementById("submit");
	var inputValue = userForm.elements;
	var right;		//用于判定 错误 right ++
	function checkForm() {
		for (var i = 0; i < input.length; i++) {
			input[i].index = i;
			input[i].onfocus = function() {
				p[this.index].style.visibility = "visible";
			}
		}	//获得焦点

	input[0].onblur = function() {
		var reg = /^[\u4e00-\u9fa5]{2,6}$/g;
		if (this.value == "") {
			p[0].innerHTML = "blank！";
			this.style.borderColor = "red";  
		}
		else if (reg.test(this.value)) {
			p[0].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[0].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	 //姓名

	input[1].onblur = function() {
		if (this.value == "") {
			p[1].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (this.value == "男" || this.value == "女") {
			p[1].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[1].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//性别

	input[2].onblur = function() {
		var reg = /^[0-9]{10}$/g;
		if (this.value == "") {
			p[2].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[2].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[2].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//学号


	input[3].onblur = function() {
		var reg = /^[\u4e00-\u9fa5]{4,10}$/g;
		if (this.value == "") {
			p[3].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[3].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[3].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//学院

	input[4].onblur = function() {
		var reg = /^199[0-9]\.([1-9]|10|11|12)\.([1-9]|([1-2][0-9])|3[0-1])$/g;
		if (this.value == "") {
			p[4].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[4].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[4].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//出生日期

	input[5].onblur = function() {
		var reg = /^201[0-9]$/g;
		if (this.value == "") {
			p[5].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[5].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[5].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//年级

	input[6].onblur = function () {
		var reg = /^[\u4e00-\u9fa5]{2,8}$/g;
		if (this.value == "") {
			p[6].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[6].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[6].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//专业

	input[7].onblur = function() {
		var reg = /^1[0-9]{10}$/g;
		if (this.value == "") {
			p[7].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[7].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[7].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//电话

	input[8].onblur = function() {
		var reg =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
		if (this.value == "") {
			p[8].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[8].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[8].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	//邮箱

	input[9].onblur = function() {
		var reg = /^前端|后台|设计|运营$/g;
		if (this.value == "") {
			p[9].innerHTML = "不能为空！";
			this.style.borderColor = "red"; 
		}
		else if (reg.test(this.value)) {
			p[9].innerHTML = "right!";
			this.style.borderColor = 'green';
		}
		else {
			p[9].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
		}	//报名职位     
	}	//checkForm函数

	checkForm();	//检查表单能否提交

	function serialize(form) {
		var parts = new Array();
		//var eleLength = form.length;
		//var input = form.getElementsByTagName("input");
		//var name = form.getElementsByTagName("span");
		var name_arr = [];
		for (var i = 0; i < input.length; i++) {
			name_arr.push(input[i].name);
		}
		for (var j = 0; j < input.length; j++) {
			input[j].index = j;
			parts.push(name_arr[input[j].index] + "="
			+ input[j].value);
		}

		return parts.join("&");   //把数组转化为以&号分割的参数段字符串

	}	//序列化表单,把数据转化成一定的格式

	function Ajax(url) {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					//console.log(JSON.parse(xhr.responseText));
					console.log(xhr.responseText);
					alert('提交成功！');
					}
				} else {
					console.log("请求数据失败，错误代码：" + xhr.status);
				}
			}
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
		xhr.send();	 //传入的参数就是serialize函数的返回值
	}	//发送给后台的ajax
		
	button.onclick = function() {
		for( var i = 0; i < input.length-3; i++) {
			if (input[i].style.borderColor != "green") {
				right = 0;
				break;
			}
			else {
				right = 1;
			}
		}	//for循环
		if (right == 0) {
			alert("提交失败！请检查你的表单！");
		}
		else {
			var date = new Date();
			var time = '';
			time = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
			Ajax("http://localhost/signup_save?time="+time+'&'+serialize(userForm));	//传递地址参数
			//console.log(serialize(userForm));
		}	
	}	//要判定表弟能否提交

		//console.log(serialize(userForm));	
}  
	//提交表单 




// 提交表单：1、表单序列化，获取表单的信息 2、把表单的信息转化成字符串形式
//即post请求send（）的参数 4、创建一个Ajax