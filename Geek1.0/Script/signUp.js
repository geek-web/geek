window.onload = function() {
	var userForm = document.getElementById("form");
	var inputList = userForm.getElementsByTagName("input");
	var p = userForm.getElementsByTagName("p");
	var button = document.getElementById("submit");
	var inputValue = userForm.elements;
	var right;		//用于判定 错误 right ++
	function checkForm() {
		for (var i = 0; i < inputList.length-3; i++) {
		inputList[i].index = i;
		inputList[i].onfocus = function() {
			p[this.index].style.visibility = "visible";
			}
		}	//获得焦点

		inputList[0].onblur = function() {
		var reg = /^[\u4e00-\u9fa5]{2,4}$/g;
		if (this.value == "") {
			p[0].innerHTML = "blank！";
			this.style.borderColor = "red";  
		}
		else if (reg.test(this.value)) {
			p[0].innerHTML = "right!";
			this.style.borderColor = 'green';
			right++;
		}
		else {
			p[0].innerHTML = "wrong!";
			this.style.borderColor = "red"; 
		}
	}	 //姓名

	inputList[1].onblur = function() {
		if (this.value == "") {
			p[1].innerHTML = "blank!";
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

	inputList[2].onblur = function() {
		var reg = /^[\u4e00-\u9fa5]{4,10}$/g;
		if (this.value == "") {
			p[2].innerHTML = "blank!";
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
	}	//学院

	inputList[3].onblur = function() {
		var reg = /^199[0-9]\.([1-9]|10|11|12)\.([1-9]|([1-2][0-9])|3[0-1])$/g;
		if (this.value == "") {
			p[3].innerHTML = "blank!";
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
	}	//出生日期

	inputList[4].onblur = function() {
		var reg = /^201[0-9]$/g;
		if (this.value == "") {
			p[4].innerHTML = "blank!";
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
	}	//年级

	inputList[5].onblur = function () {
		var reg = /^[\u4e00-\u9fa5]{2,8}$/g;
		if (this.value == "") {
			p[5].innerHTML = "blank!";
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
	}	//专业

	inputList[6].onblur = function() {
		var reg = /^1[0-9]{10}$/g;
		if (this.value == "") {
			p[6].innerHTML = "blank!";
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
	}	//电话

	inputList[7].onblur = function() {
		var reg =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
		if (this.value == "") {
			p[7].innerHTML = "blank!";
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
	}	//邮箱

	inputList[8].onblur = function() {
		var reg = /^前端|后台|设计|运营$/g;
		if (this.value == "") {
			p[8].innerHTML = "blank!";
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
		}	//报名职位     
	}	//checkForm函数

	checkForm();	//调用函数

	function serialize(form) {
		var parts = new Array();
		var eleLength = form.length;
		var eleList = form.getElementsByTagName("input");
		var name = form.getElementsByTagName("span");
		var nameLi = [];
		for (var i = 0; i < name.length; i++) {
			nameLi.push(name[i].innerHTML);
		}
		for (var i = 0; i < eleLength; i++) {
			eleList[i].index = i;
			parts.push(encodeURIComponent(nameLi[eleList[i].index]) + "="
			+ encodeURIComponent(eleList[i].value));
		}

		return parts.join("&");

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
					alert("提交成功！");
					}
				} else {
					alert("请求数据失败，错误代码：" + xhr.status);
				}
			}
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(serialize(userForm));	 //传入的参数就是serialize函数的返回值
	}	//发送给后台的ajax
	
	button.onclick = function() {
		for( var i = 0; i < inputList.length-3; i++) {
			if (inputList[i].style.borderColor != "green") {
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
			Ajax();		//传递地址参数
		}	
		//alert(Math.ceil(Math.random()*8));
	}	//要判定表弟能否提交
}  
	//提交表单 




// 提交表单：1、表单序列化，获取表单的信息 2、把表单的信息转化成字符串形式
//即post请求send（）的参数 4、创建一个Ajax