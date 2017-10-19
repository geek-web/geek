//查询字符串函数，在URL栏里添加？和&
function addURLParam(url,name,value) {
    url +=(url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

window.onload = function(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://localhost/ach_list',true);
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4) {
            if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
                var json=JSON.parse(xhr.responseText);
                //获取项目的个数，将他们写入div中
                var length = json.data.length;
                var lmh_contain = document.getElementById("lmh_contain");
                var str = '';
                for(let i=0;i<length;i++)
                    {
                        str += "<div class='lmh_description'><img src='image/"+(json.data)[i].photo[0].pho+"'><p><a href=''>"+(json.data)[i].name+"</a></p></div>";

                    }
                lmh_contain.innerHTML = str;
               


                //给项目名称的超链基绑定点击事件,给URL添加一个参数
                var aHref = lmh_contain.getElementsByTagName("a");
                for(var i=0;i<aHref.length;i++)
                    {
                        aHref[i].onclick = function ()
                        {
                            var aName = this.firstChild.nodeValue;
                            var idValue;
                            for(var j=0;j<aHref.length;j++)
                            {
                                if((json.data)[j].name==aName)
                                {
                                    idValue = (json.data)[j].id;
                                }
                            }
                            var url = "concrete.html";
                            url = addURLParam(url,"id",idValue);
                            this.setAttribute("href",url);
                        }
                    }
            }else{
                alert("请求失败，请检查是否是网络原因、、、"+xhr.status);
            }
        }
    }
}