
$("document").ready(function () {
    console.log("ready");
})

var currentUserId = "";

document.addEventListener("DOMContentLoaded", function () {
    currentUserId = getCookie("username");
    if (currentUserId == null) {
        alert("You are not logged in. Redirecting to home...");
        window.location.href = "/SolaraScripthub";
    }
    if (currentUserId != null) {
        fetch("https://proxy.corsfix.com/?http://147.185.221.19:7132/solara-scriptdb/checkpassword?id="+currentUserId+"&passwd="+getCookie("passwd")).then(r => {
            if (r.status != 200) {
                alert("Invalid password! Logging out...");
                eraseCookie("username");
                eraseCookie("passwd");
                window.location.reload();
            }
        });
    }

    var submitBtn = document.getElementById("submit-btn");
    var scriptNameBox = document.getElementById("script-name-box");
    var scriptDescBox = document.getElementById("script-desc-box");
    var scriptBox = document.getElementById("script-box");

    submitBtn.onclick = function () {
        if (!scriptNameBox.checkValidity() || !scriptDescBox.checkValidity() || !scriptBox.checkValidity()) {
            alert("Please, fill all textboxes correct!")
        }
        else {
            fetch("https://proxy.corsfix.com/?http://147.185.221.19:7132/solara-scriptdb/newscript?creator="+currentUserId+"&name="+encodeURIComponent(scriptNameBox.value)+"&description="+encodeURIComponent(scriptDescBox.value), {
                method: "post",
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain'
                },
                body: scriptBox.value
            })
            .then((response) => {
                if (response.status == 200) {
                    response.text().then(t=>{
                        rJSON = JSON.parse(t);
                        alert("OK! Your new script id is "+rJSON.newscriptid+"! Redirecting to home...");
                        window.location.href = "/SolaraScripthub";
                    });
                }
                else {
                    response.text().then(t=>{
                        rJSON = JSON.parse(t);
                        alert("Error! "+rJSON.message);
                    });
                }
            });
        }
    }
});