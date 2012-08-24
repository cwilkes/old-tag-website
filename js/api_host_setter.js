

var cookieName = 'tfg_api_host';

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function setCookieBasedOnServer() {
    var xmlhttp =  new XMLHttpRequest();
    xmlhttp.open("GET","/api_host.txt", true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4){
            console.log("Setting api host to " + xmlhttp.responseText);
            setCookie(cookieName, xmlhttp.responseText, 2);
        }
    };
    xmlhttp.send();
}

var tfg_api_host = getCookie(cookieName);
if (tfg_api_host == undefined) {
    setCookieBasedOnServer();
}