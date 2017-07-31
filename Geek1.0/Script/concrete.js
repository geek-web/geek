//定义一个获取URL，并且提取id的值的函数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
    {
        return decodeURI(r[2]);
    }
    else{
        return null;
        }
}
//轮播
function lunboActive() {
    //获取每个项目轮播图的数量
    var x = document.getElementsByClassName("bigimg").length;
    var lunboContain = document.getElementById("lunboContain");
    var lunbo = document.getElementById("lunbo");
    lunboContain.style.width = 432*x+"px";
    lunboContain.style.height = "362px";
    //方向
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    //定义函数
    var a = 0;
    left.onclick = function (){
        a = a-432;
        lunboContain.style.marginLeft = a+"px";
        if(a == -432*x)
        {
            lunboContain.style.marginLeft = "0px";
            a=0;
        }
    }
    right.onclick = function (){
        if(a == 0)
        {
            lunboContain.style.marginLeft = -432*x+"px";
            a=-432*x;
        }
        a = a+432;
        lunboContain.style.marginLeft = a+"px";
    }
    //定义自动播放
    var timer;
    function play(){
        timer = setInterval(function(){
            left.onclick()}, 2000);
    }
    play();
    //停止播放
    function stop(){
        clearInterval(timer);
    }
    //绑定两个鼠标事件，滑过时停止轮播
    lunbo.onmouseover = function(){
        stop();
        left.style.display="block";
        right.style.display="block";
    }
    lunbo.onmouseout = function(){
        play();
        left.style.display="none";
        right.style.display="none";
    }
}
function lunboAjax() {
    var purpose = GetQueryString("id");
    //创建ajax
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://rapapi.org/mockjsdata/19853/achieve',true);
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4) {
            if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
                var json=JSON.parse(xhr.responseText);
                var length = json.achievement.length;
                var lunboContain = document.getElementById("lunboContain");
                var context = document.getElementById("context");
                var str1 = '';
                var str2 = '';
                for(var i=0;i<length;i++)
                {
                    if(json.achievement[i].id==purpose)
                    {
                        var lunbo = json.achievement[i].lunbo;
                        //拼接轮播图
                        for(var j=0;j<lunbo.length;j++)
                            {
                                str1 += "<img src='"+json.achievement[i].lunbo[j]+"' class='bigimg'>";
                            }
                        //拼接它的介绍内容
                        str2 = "<h1>"+json.achievement[i].name+"</h1><p>"+json.achievement[i].description+"</p><a href=''><button>免费下载</button></a><img src='"+json.achievement[i].download+"'>";
                        lunboContain.innerHTML = str1;
                        lunboActive();
                        context.innerHTML = str2
                    }
                }
            }else{
                alert("请求失败，请检查是否是网络原因、、、"+xhr.status);
            }
        }

    }
}
window.onload = function () {
    lunboAjax();
}
