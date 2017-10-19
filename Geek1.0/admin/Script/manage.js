// function serialize(form){
// 		console.log(form.length);
// 		var parts={};
// 		for (let i = 0; i <form.length; i++) {
// 			//console.log(form.elements[i]);
// 			var field=form[i];
// 			switch (field.type){
// 				case "button":
// 				    break;
// 				case "radio":
// 				if(!field.checked){
// 					break;
// 				}
// 				default:
// 				if(parts[field.name]){
// 					parts[field.name]=parts[field.name]+","+field.value;
// 				}
// 				else{
// 					parts[field.name]=field.value;
// 				}
// 				break;
// 			}
// 		}
// 		return parts;
// 	}
window.onload=function () {
	var join=document.getElementById('join');
	var mask=document.getElementById("mask");
	var login=document.getElementById("login");
	var close=document.getElementById("close");
	var form=document.getElementById("formid");
	var contain=document.getElementById("tb");
	var aInput=document.getElementsByTagName('input');
	var pername=aInput[0];
	var schoolNum=aInput[1];
	var perins=aInput[2];
	var percon=aInput[3];
	 var perphoto=aInput[4];
	var sure=document.getElementById("sure");
	var change=document.getElementById("change");
//检查表单		
	// function checkData(){
	// 	if (name.value=="") {
	// 		alert("用户名不能为空");
	// 		return false;
	// 	}
	// 	if (schoolNum.value=="") {
	// 		alert("学号不能为空");
	// 		return false;
	// 	}
	// 	if (con.value=="") {
	// 		alert("状态不能为空");
	// 		return false;
	// 	}
	// 	return true;
	// }
     sure.onclick=function(){
     	document.getElementById("formid").target="rfFrame";
     }
	join.onclick=function(){
		mask.style.display="block";
		mask.style.height=document.body.offsetHeight+'px';
		login.style.display="block";
	}
	close.onclick=function(){
		mask.style.display="none";
		login.style.display="none";
		//点击保存后清空表单的内容内容
		 pername.value="";
		schoolNum.value="";
		perins.value="";
	}
function getmem(){
	var xhr=new XMLHttpRequest();
	xhr.open('get','http://localhost/mem_list',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charest=utf-8");
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200||xhr.status==304){
				console.log(xhr.responseText);
           		var json=JSON.parse(xhr.responseText);
          		var str='';
          		for(var i=0;i<json.data.length;i++){
             		str +='<tr class="Jstr">'+'<td>'+ '<img src="image/'+ json.data[i].photo +'" class ="img-rounded">' +'</td>'+'<td>'
            		 +json.data[i].name+'</td>'+'<td>'+json.data[i].num+
             		'</td>'+'<td>'+json.data[i].ins+'</td>'
            		 +'<td>'+'<button type="button" class="btn btn-info">'+json.data[i].con+'</button>'+'</td>'+'<td>'+'<a href="#">'+
          			'<span  name="alter" class="glyphicon glyphicon-pencil">'+'&nbsp;'+'</span>'+
          			'<span name="delet" class="glyphicon glyphicon-trash">'+'</span>'
          			'</a>'+'</td>'+'</tr>' ;
      			}
      			contain.innerHTML = str;
      			//删除成员
      	function deletData(){
         var deletearr=document.getElementsByName("delet");
	      for (let j = 0; j <deletearr.length; j++) {
		       deletearr[j].onclick=function(){
				var nowxhr=new XMLHttpRequest();
				nowxhr.open('post','http://localhost/mem_delete?id='+json.data[j].id,true);
				nowxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charest=utf-8");
				nowxhr.send();
				nowxhr.onreadystatechange=function(){
    			    if(nowxhr.readyState==4){
        				if(nowxhr.status ==200||nowxhr.status ==304){
        					alert("已删除·");
        				}
        				else{
        					alert('删除失败'+nowxhr.status);
        				}
        			}
       	   		}
        	 }
        }  
    }
        //修改成员
        function alterData(){
			var alterarr=document.getElementsByName("alter");
			for (let i = 0; i <alterarr.length; i++) {
				alterarr[i].onclick=function(){
				console.log(json.data[i].id);//id
				 login.style.display="block";
				 mask.style.display="block";
				 mask.style.height=document.body.offsetHeight+'px';//遮罩全部
			     pername.value=json.data[i].name;
				 schoolNum.value=json.data[i].num;
				 perins.value=json.data[i].ins;
				change.onclick=function(){
     	            document.getElementById("formid").target="rfFrame";
                }
				sure.style.display="none";
				change.style.display="block";
				form.action="http://localhost/mem_update?id="+json.data[i].id;
				// nxhr.onreadystatechange=function(){
    // 				if(nxhr.readyState==4){
    //     				if(nxhr.status ==200||nxhr.status ==304){
    //     					alert("修改成功");
    //     				}
    //     				else{
    //     					alert('修改失败'+nxhr.status);
    //     				}
    //     			}
    //     		}	
        		
				}
			}
			
		}	
		
    deletData();
    alterData();
  }

		
		

			else {alert('请求失败'+xhr.status); }   
		}
	}
}
  
		getmem();
}