
function createScriptCard(userid,name,description,script) {
    var scriptdiv = document.createElement("div");
    var infodiv = document.createElement("div");
    var bottombardiv = document.createElement("div");

    bottombardiv.className = "bottom-script-div";
    var userlink = document.createElement("a");
    userlink.href = "user?id="+userid;
    userlink.innerHTML = "User";
    var getbtn = document.createElement("button");
    getbtn.className = "get-btn";
    getbtn.innerHTML = "Get Script";
    bottombardiv.appendChild(userlink);
    bottombardiv.appendChild(getbtn);

    var scriptimg = document.createElement("div");
    scriptimg.className = "script-img";
    var img = document.createElement("img");
    img.src = "icon.png";
    img.alt = "User Icon";
    img.setAttribute("width","128px");
    img.setAttribute("height","100%");
    var scriptname = document.createElement("h2");
    scriptname.className = "script-title";
    scriptname.innerHTML = name;
    scriptimg.appendChild(img);
    scriptimg.appendChild(scriptname);

    var scriptdesc = document.createElement("p");
    scriptdesc.innerHTML = description;

    infodiv.appendChild(scriptimg);
    infodiv.appendChild(scriptdesc);

    scriptdiv.className = "script-div";
    scriptdiv.appendChild(infodiv);
    scriptdiv.appendChild(bottombardiv);

    return scriptdiv;
}


$("document").ready(function(){
    console.log("ready");
})

document.addEventListener("DOMContentLoaded",function() {
    var cardselement = document.querySelector(".content");
    cardselement.appendChild(createScriptCard(2,"Fly2","Flying E",""));
})