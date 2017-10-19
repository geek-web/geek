		function getInformation() {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open('GET', 'http://localhost/signup_list', true);
		xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 ) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					console.log('post is success');
					var odata = JSON.parse(xhr.responseText);
					var data = odata.data;
					var s='',s1 = '';
					s = '<caption class="caption">招新信息汇总</caption><tr><th>报名时间</th>'+
					'<th>姓名</th><th>性别</th><th>职位</th><th>学号</th><th>学院</th>'+
					'<th>年级</th><th>专业</th><th>生日</th><th>电话</th><th>邮箱</th>'+
					'<th>操作</th></tr>';

					for (var i = 0; i < data.length; i++) {
						var s2 = '';
						s2 = '<tr>' + '<td>' + data[i].time + '</td>'
						+'<td>' + data[i].name + '</td>'
						+'<td>' + data[i].sex + '</td>'
						+'<td>' + data[i].position + '</td>'
						+'<td>' + data[i].number + '</td>'
						+'<td>' + data[i].school + '</td>'
						+'<td>' + data[i].grade + '</td>'
						+'<td>' + data[i].marjor + '</td>'
						+'<td>' + data[i].birthday + '</td>'
						+'<td>' + data[i].phone + '</td>'
						+'<td>' + data[i].email + '</td>'
						+ '<td class="delete" id="' + data[i].id + '">删除</td>' 
						+'</tr>';
						s1 = s1 + s2;
					}
					var table = document.getElementById('information');
					table.innerHTML = s + s1;
					deletePerson();
				} else {
					console.log('get is fail');
				}
			}
		}
}


function deletePost(url) {
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
					console.log('delete is success');
				} else {
					console.log('delete is fail');
				}
			}
		}	
}

function deletePerson() {
	var det = document.querySelectorAll('.delete');
	var table = document.getElementById('table');
	for(let i = 0;i < det.length; i++) {
		det[i].onclick = function() {
			var r = window.confirm('确定要删除此成员吗？');
			if (r) {
				console.log(this.id);
				deletePost('http://localhost/signup_delete?id='+this.id);
				this.parentNode.parentNode.removeChild(this.parentNode);
			}
		}
	}

}




window.onload = function() {
	getInformation();
	moveMark();
}