/*一个图片预览 的函数*/
function imgShow(id1,id2) {
   var imgSelect = document.getElementById(id1);
   var inputImg = document.getElementById(id2);
   inputImg.onchange = function () {
      for (var i = 0;i < inputImg.files.length;i++) {
         var url = window.URL.createObjectURL(inputImg.files[i]);
         var img = new Image();
         img.src = url;
         img.style.height = "80px";
         img.style.width = "80px";
         imgSelect.appendChild(img);
      }
   }
}
   

//遮罩层与弹出框的出现函数
function cover() {
      //遮罩层
      var mask = document.createElement("div");
      mask.id = "mask";
      var height = document.body.offsetHeight;
      mask.style.backgroundColor = 'black';
      mask.style.height = height + 'px';
      document.body.appendChild(mask);
      //跳出弹出框
      var project = document.getElementById("addProject");
      project.style.display = 'block';
}


//点击新增项目按钮，跳出弹出框
function alertProject() {
   var add = document.getElementById("add");
   add.onclick = function() {
      cover();
      var save = document.getElementById("save");
      save.style.display = 'block';
   }
}




//点击保存按钮关闭弹出框
function close () {
   var closeForm = document.getElementById("closeForm");
   closeForm.onclick = function() {
       //关闭弹出框
      var project = document.getElementById("addProject");
      project.style.display = 'none';
      //关闭遮罩
      var mask = document.getElementById("mask");
      document.body.removeChild(mask);
   }
   var save = document.getElementById("save");
   save.onclick = function () {
      //点击保存按钮提交项目内容
      submitData();
      //关闭弹出框
      var project = document.getElementById("addProject");
      project.style.display = 'none';
      //关闭遮罩
      var mask = document.getElementById("mask");
      document.body.removeChild(mask);
      

      //点击保存后清空表单的内容内容
      //标题
      var inputHead1 = document.getElementById("inputHead");
      inputHead1.value = " ";
      //轮播图
      var inputImg1 = document.getElementById("imgSelect2");
      inputImg1.innerHTML = " ";
      //描述
      var description1 = document.getElementById("txta");
      description1.value = " ";
   }

}




//点击删除按钮删除那一行
function deleteRow() {
   var rows = document.getElementsByName("delete");
   for (let i = 0;i<rows.length;i++) {
      rows[i].onclick = function () {
               if (confirm("确定删除这个项目吗？")) {
                  //给后台发送这个项目的id
                  var xhr = new XMLHttpRequest();
                  xhr.onreadystatechange = function () {
                     if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
                        //在网页中清除那一行项目的信息
                           alert("清除成功！");
                        //刷新页面
                           //window.location.reload(); 
                           
                        }
                        else {
                           alert("清除失败"+xhr.status);
                        }
                     }
                  };
                  xhr.open("post", "http://localhost/ach_delete?id="+this.parentNode.parentNode.firstChild.innerHTML, true);
                  xhr.setRequestHeader("content-Type", "application/x-www-form-urlencodedd");
                  xhr.send();
               }
               else {
                  alert("未删除！");
               }
      }
   }
}




// 表单序列化函数
function formSerializa(form) {
   var myForm = document.getElementById(form);
   var formArray = {};
   for (var i = 0;i < myForm.length;i++) {
      var feled = myForm.elements[i];
      switch (feled.type) {
         case "button":
            break;
         default:
            if (formArray[feled.name]) {
               formArray[feled.name] = formArray[feled.name]+","+feled.value;
            }
            else {
               formArray[feled.name] = feled.value;
            }
            break;
      }
   }
   return formArray;
}


// 保存项目的函数
function submitData () {
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
         if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
            alert("项目提交成功！"+xhr.responseText);
            //window.location.reload(); 
         }
         else {
            alert("项目提交失败！:"+xhr.status);
         }
      }
   };
   xhr.open("post", "http://localhost/ach_save?name="+formSerializa("myForm").name+"&ins="+formSerializa("myForm").ins, true);
   xhr.setRequestHeader("content-Type", "application/x-www-form-urlencodedd");
   xhr.send();
}

 




//获得get请求
function getProject () {
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
         if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
            var json = JSON.parse(xhr.responseText);
            
            //执行分页函数
            page({
                     id:"fengye",
                     nowNum:1,
                     allNum:Math.ceil((json.data.length)/6),
                     callback: function (now,all) {
                              var str = " ";
                              var myTbody = document.getElementById("myTbody");
                              var num = (now*6 < json.data.length)? 6 : json.data.length-(now-1)*6;
                              for (var i=0;i<num;i++) {
                                  str = str+'<tr><td>'+(json.data)[(now-1)*6+i].id+'</td><td>'+(json.data)[(now-1)*6+i].name+'</td><td>'+(json.data)[(now-1)*6+i].ins+'</td><td><img src="image/'+(json.data)[(now-1)*6+i].photo[0]+'" style="height: 80px; width: 80px;"></td><td><button class="btn btn-default" name="change">修改</button><button class="btn btn-default" name="delete">删除</button></td></tr>';                                
                              }
                              myTbody.innerHTML = str;
                              changeInfo()
                              deleteRow()
                     }
               });
            //表格的修改功能
            function changeInfo () {
               var change = document.getElementsByName("change");
               for (let j = 0;j < change.length;j++) {
                  change[j].onclick = function () {                    
                     //保存图片
                     var button = document.getElementById("button");
                     button.onclick = function () {
                       
                        var action = document.getElementById("formFile").action;
                        action = action+"?achid="+number;
                        document.getElementById("formFile").action = action;
                        alert(document.getElementById("formFile").action)
                        document.getElementById("formFile").target="rfFrame";
                     }                 
                  //显示弹出框
                  cover();
                  //修改按钮出现
                  var changeButton = document.getElementById("changeButton");
                  changeButton.style.display = 'block'; 
                  //在弹出框显示当前要修改的项目的原始内容
                  //获得项目编号
                  var number = this.parentNode.parentNode.firstChild.innerHTML;
                  //标题
                  var inputHead = document.getElementById("inputHead");
                  inputHead.value = (json.data)[j].name;(json.data)[j].name
                  //描述
                  var description1 = document.getElementById("txta");
                  description1.value = (json.data)[j].ins;
                  //轮播图
                  var inputImg2 = document.getElementById("imgSelect2");
                  for(let k = 0;k<(json.data)[j].photo.length;k++) {
                     var img1 = document.createElement("img");
                     img1.src = (json.data)[j].photo[k];
                     img1.style.height = "80px";
                     img1.style.width = "80px";
                     inputImg2.appendChild(img1);
                     var button = document.createElement("button");
                     button.name = "deleteImg";
                     button.innerHTML = "delete";
                     inputImg2.appendChild(button);
                  //修改上传的图片
                  //删除该图片，像后台返回删除的图片的id
                  var deleteImg = document.getElementsByName("deleteImg");
                     deleteImg[k].onclick = function () {
                     //给后台返回修改的那个图片的id值
                     var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                           if (xhr.readyState == 4) {
                              if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
                                 alert("该图片已删除");
                              }
                              else {
                                 alert("该图片删除失败:"+xhr.status);
                              }
                           }
                        };
                        xhr.open("post", "http://localhost/pho_delete?id="+((json.data)[j].photo)[k].id, true);
                        xhr.setRequestHeader("content-Type", "application/x-www-form-urlencodedd");
                        xhr.send();
                     }
                  }

                  changeButton.onclick = function() {
                      //给后台返回修改的那个项目的id值
                     var xhr = new XMLHttpRequest();
                     xhr.onreadystatechange = function () {
                           if (xhr.readyState == 4) {
                              if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
                                 alert("项目修改成功！");
                              }
                              else {
                                 alert("项目修改失败:"+xhr.status);
                              }
                           }
                     };
                     xhr.open("post", "http://localhost/ach_update?id="+number+'&name='+formSerializa("myForm").name+"&ins="+formSerializa("myForm").ins, true);
                     xhr.setRequestHeader("content-Type", "application/x-www-form-urlencodedd");
                     xhr.send();
                     //关闭弹出框
                     var project = document.getElementById("addProject");
                     project.style.display = 'none';
                     //关闭遮罩
                     var mask = document.getElementById("mask");
                     document.body.removeChild(mask);
                     //点击保存后清空表单的内容内容
                     //标题
                     var inputHead1 = document.getElementById("inputHead");
                     inputHead1.value = " ";
                     //轮播图
                     var inputImg1 = document.getElementById("imgSelect2");
                     inputImg1.innerHTML = " ";
                     //描述
                     var description1 = document.getElementById("txta");
                     description1.value = " ";
                  }//changeButton
               }
            }
         }
      }
         else {
            alert("未从后台获取正确的数据:"+xhr.status);
         }
      }
   };
   xhr.open("get", "http://localhost/ach_list", true);
   xhr.send(null);
}
//定义一个分页函数
function page (obj) {
   var idValue = obj.id;//获取需要存放页码的那个容器的id
   var div1 = document.getElementById(idValue);
   var myTbody = document.getElementById("myTbody");
   var nowNum = obj.nowNum;//获取当前页的页码
   var allNum = obj.allNum;//获取总的页码
   var callback = obj.callback;//获取一个回掉函数
   //如果当前页码大于1，添加首页,与下一页
   if (nowNum > 1) {
      var aHref = document.createElement("a");
      aHref.innerHTML = '首页';
      aHref.className = "first";
      aHref.href = "#"+1;
      div1.appendChild(aHref);
      var bHref = document.createElement("a");
      bHref.innerHTML = '上一页';
      bHref.className = "pre";
      bHref.href = "#"+(nowNum-1);
      div1.appendChild(bHref);
   }
   //假设当总页数小于5时，显示所有的页数
   if (allNum<=5) {
      for (var i = 1;i <= allNum; i++) {
         var aHref = document.createElement("a");
         if (i == nowNum) {
            aHref.style.backgroundColor = '#0099FF';//当前页页码的背景颜色为蓝色
         }
         aHref.innerHTML = i;
         aHref.href = "#"+i;
         div1.appendChild(aHref);
      }
   }
   //当总页数大于5时，显示五页，分别为当前页，和当前页的前两页，与当前页的后两页     
   else if (allNum > 5) {
      for (var i = 1;i<=5;i++) {
         //如果当前页是第一和第二页，就是按照小于五页，显示每一页，不然就会出现负的页码
         if (nowNum == 2||nowNum == 1) {
            var aHref = document.createElement("a");
            if (i == nowNum) {
               aHref.style.backgroundColor = '#0099FF';
            } 
            aHref.innerHTML = i;       
            aHref.href = "#"+i;
            div1.appendChild(aHref);
         } 
         //如果是最后一页或者最后第二页，就显示最后一页开始的五个页码，不然就会出现大于总页数的页码
         else if (nowNum == allNum || nowNum == allNum -1) {
            var aHref = document.createElement("a");
            if (((nowNum == allNum-1)&&i==4)||(nowNum==allNum&&i==5)) {
               aHref.style.backgroundColor = '#0099FF';
            } 
            aHref.innerHTML = allNum-5+i;
            aHref.href = "#"+(allNum-5+i);
            div1.appendChild(aHref);
         } 
         //正常出现
         else {
            var aHref = document.createElement("a");
            if ((nowNum-3+i) == nowNum) {
               aHref.style.backgroundColor = '#0099FF';
            }
               aHref.innerHTML = (nowNum-3+i);
               aHref.href = "#"+(nowNum-3+i);
               div1.appendChild(aHref);
         }
      }   
   }
   //添加尾页，下一页
   if (nowNum < allNum) {
      var aHref = document.createElement("a");
      aHref.innerHTML = '下一页';
      aHref.className = "next";
      aHref.href = "#"+(nowNum+1);
      div1.appendChild(aHref);
      var bHref = document.createElement("a");
      bHref.innerHTML = '尾页';
      bHref.className = "last";
      bHref.href = "#"+allNum;
      div1.appendChild(bHref);
   }
   callback(nowNum,allNum);
   //点击页码变化
   var a = div1.getElementsByTagName("a");
   for (var i = 0; i < a.length; i++  ) {
      a[i].onclick = function () {
         myTbody.innerHTML = " ";//清空原来显示的内容，添加新的内容
         var nowNum = parseInt(this.getAttribute('href').substring(1));
         div1.innerHTML = " ";//清空原来的页码
         //执行page函数
         page({   
            id : div1.id,
            nowNum : nowNum,
            allNum : allNum,
            callback:callback
      
         });
      }
   }
}
//定义一个主函数
function _main () {
   imgShow("imgSelect2","inputImg2");
   alertProject();
   close();
   getProject();
}
_main();
 