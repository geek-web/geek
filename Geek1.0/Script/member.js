window.onload=function () {
	var mrr_nowMember=document.getElementById('mrr_nowMember');
	var mrr_graMember=document.getElementById('mrr_graMember');
	var list=document.getElementById("mrr_Information");
	var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    
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
             str += '<div class="mrr_member1">'+'<div id="mrr_perPs">'+
                   '<img src="../img/' + json.data[i].img +'">' +
             		  '</div>'+
             '<p id="mrr_preMes">'+json.data[i].name+'</p>'
                      +'</div>'
             		 +'</div>'; 
          } 
          document.getElementById('mrr_Information').innerHTML = str;
      }
        else {alert('请求失败'+xhr.status); }     
    }                    
}
function change(){
    	if(index>=3){
    				mrr_graMember.style.borderBottom="2px solid white";
    				mrr_nowMember.style.borderBottom="none";
    			}
    			else{
    				mrr_graMember.style.borderBottom="none";
    				mrr_nowMember.style.borderBottom="2px solid white";
    			}
    }
   mrr_nowMember.onclick=function(){
    list.style.left=0+'px';	
	mrr_nowMember.style.borderBottom="2px solid white";
	mrr_graMember.style.borderBottom="none";
    }
   mrr_graMember.onclick=function(){
    list.style.left=-1960+'px';	
    mrr_nowMember.style.borderBottom="none";
	mrr_graMember.style.borderBottom="2px solid  white";
    }
    next.onclick=function(){    	
    	if (parseInt(list.style.left)>-2940) {
    		list.style.left=parseInt(list.style.left)-980+'px';
    	    index=index+1;
    		change();
 			
    	}
    }
    prev.onclick=function(){
    	if (parseInt(list.style.left)<0) {
    	list.style.left=parseInt(list.style.left)+980+'px';
    	index=index-1;
    	change();}
    }
}

	