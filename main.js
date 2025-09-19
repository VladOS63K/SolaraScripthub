
function createScriptCard(id, userid, name, description, script) {
    var scriptdiv = document.createElement("div");
    var infodiv = document.createElement("div");
    var bottombardiv = document.createElement("div");

    bottombardiv.className = "bottom-script-div";
    var userlink = document.createElement("a");
    fetch("https://proxy.corsfix.com/?https://147.185.221.19:7132/solara-scriptdb/getuserdata?id=" + userid,{mode:"no-cors"}).then(r => {
        if (r.status == 200) {
            r.text().then(text => {
                var resp = JSON.parse(text);
                userlink.innerText = resp.data[1] + " (ID " + userid + ")";
                if (currentUserId == userid) {
                    userlink.title = "This is you!";
                }
            });
        }
        else {
            r.text().then(text => {
                userlink.innerText = "Error:" + JSON.parse(text).message;
            })
        }
    });
    userlink.innerText = "Loading username...";
    var getbtn = document.createElement("button");
    getbtn.className = "get-btn";
    getbtn.innerText = "Get Script";
    getbtn.onclick = function() {
        document.getElementById("scriptviewer-box").innerText = script;
        document.getElementById("code-dialog").show();
    };
    bottombardiv.appendChild(userlink);
    bottombardiv.appendChild(getbtn);

    var scriptimg = document.createElement("div");
    scriptimg.className = "script-img";
    var img = document.createElement("img");
    img.src = "icon.png";
    img.alt = "Icon";
    img.setAttribute("width", "128px");
    img.setAttribute("height", "100%");
    var scriptname = document.createElement("h2");
    scriptname.className = "script-title";
    scriptname.innerText = name;
    scriptimg.appendChild(img);
    scriptimg.appendChild(scriptname);

    var scriptdesc = document.createElement("p");
    scriptdesc.innerText = description;

    infodiv.appendChild(scriptimg);
    infodiv.appendChild(scriptdesc);

    scriptdiv.className = "script-div";
    scriptdiv.setAttribute("scriptid", id);
    scriptdiv.setAttribute("creatorid", userid);
    scriptdiv.appendChild(infodiv);
    scriptdiv.appendChild(bottombardiv);

    return scriptdiv;
}

var currentUserId = "";


$("document").ready(function () {
    console.log("ready");
})

document.addEventListener("DOMContentLoaded", function () {
    currentUserId = getCookie("username");
    if (currentUserId != null) {
        document.querySelector(".login-btn").style.display = "none";
        fetch("https://proxy.corsfix.com/?https://147.185.221.19:7132/solara-scriptdb/getuserdata?id=" + currentUserId,{mode:"no-cors"}).then(r => {
            if (r.status == 200) {
                r.text().then(text => {
                    var resp = JSON.parse(text);
                    document.getElementById("user-div").innerText = resp.data[1] + " (ID " + currentUserId + ")";
                    document.getElementById("user-div").onclick = function() {
                        if (confirm("Really log out?")) {
                           eraseCookie("username");
                            eraseCookie("passwd");
                            window.location.reload();
                        }
                    }
                });
            }
            else {
                r.text().then(text => {
                    document.getElementById("user-div").innerText = "Error:" + JSON.parse(text).message;
                })
            }
        });
    }
    if (currentUserId != null) {
        fetch("https://proxy.corsfix.com/?https://147.185.221.19:7132/solara-scriptdb/checkpassword?id="+currentUserId+"&passwd="+getCookie("passwd"),{mode:"no-cors"}).then(r => {
            if (r.status != 200) {
                alert("Invalid password! Logging out...");
                eraseCookie("username");
                eraseCookie("passwd");
                window.location.reload();
            }
        });
    }
    fetch("https://proxy.corsfix.com/?https://147.185.221.19:7132/solara-scriptdb/getscripts",{mode:"no-cors"}).then(r => {
        r.text().then(text => {
            var resp = JSON.parse(text);
            resp.scripts.forEach(e => {
                var cardselement = document.querySelector(".content");
                cardselement.appendChild(createScriptCard(e[0], e[1], e[2], e[3], e[4]));
            });
        });
    });
})