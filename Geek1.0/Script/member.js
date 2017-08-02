window.onload=function () {
	var mrr_nowMember=document.getElementById('mrr_nowMember');
	var mrr_graMember=document.getElementById('mrr_graMember');
	var mrr_on=document.getElementById('mrr_on');
	var mrr_close=document.getElementById('mrr_close');
	var container=document.getElementById("mrr_message")
	var list=document.getElementsByTagName("mrr_Information")
	var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 3000;
    var timer;
    function animate (offset) {
         if (offset == 0) {
             return;
     }
      animated = true;
     var time = 400;
     var inteval = 10;
     var speed = offset/(time/inteval);
     var left = parseInt(list.style.left) + offset;

     var go = function (){
     if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
           list.style.left = parseInt(list.style.left) + speed + 'px';
                       setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -980 * len + 'px';
                        }
                        if(left<(-980 * len)) {
                            list.style.left = '-980px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-980);
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
                animate(980);
            }
   
	mrr_graMember.onclick=function(){
		mrr_on.style.backgroundColor="#18191E";
		mrr_close.style.backgroundColor="white";
	}
	mrr_nowMember.onclick=function(){
		mrr_on.style.backgroundColor="white";
		mrr_close.style.backgroundColor="#18191E";
	}
var xhr=new XMLHttpRequest();
xhr.open('get','http://rapapi.org/mockjsdata/23472/geek',true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charest=utf-8");
xhr.send(null);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if(xhr.status ==200||xhr.status ==304){
          console.log(xhr.responseText);
           var json=JSON.parse(xhr.responseText);
          var str='';
          for(var i=0;i<16;i++){
             str += '<div id="mrr_member1">'+'<div id="mrr_perPs">'+
                   '<img src="' + json.data.img +'">' +
             		  '</div>'+
             '<p id="mrr_preMes">'+json.data.name+'</p>'
                      +'</div>'
             		 +'</div>'; 
          } 
          document.getElementsByTagName('mrr_Information').innerHTML = str;
      }
        else {alert('请求失败'+xhr.status); }     
    }                    
}

}

	