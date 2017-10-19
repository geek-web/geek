window.onload = function() {
	var doc = document;
	var button = doc.getElementById('signup');
	button.onclick = function() {
		var name = doc.getElementById('name'),
		psw = doc.getElementById('psw');
		if (psw.value && name.value) {
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xhr.open('POST', 'http://localhost/admin_login?adminName='+name.value+'&pwd='+psw.value, true);
			xhr.setRequestHeader("Content-Type", "application/charset=utf-8");
			xhr.send();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 ) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						var state = JSON.parse(xhr.responseText);
						if (state.status == 1) {
							window.location.href = 'html/admin_infor.html';
						} else {
							alert('登陆失败！');
						}
					} else {
						alert('登录失败，请检查你的网络');
					}
				}
			}


		} else {
			alert('请输入用户名和密码！');
		}
	}

}