
$("document").ready(function () {
    console.log("ready");
})

var currentUserId = "";

document.addEventListener("DOMContentLoaded", function () {
    currentUserId = getCookie("username");
    if (currentUserId != null) {
        alert("You are also logged in. Redirecting to home...");
        window.location.href = "/SolaraScripthub";
    }
    if (currentUserId != null) {
        fetch("http://147.185.221.30:58417/solara-scriptdb/checkpassword?id=" + currentUserId + "&passwd=" + getCookie("passwd")).then(r => {
            if (r.status != 200) {
                alert("Invalid password! Logging out...");
                eraseCookie("username");
                eraseCookie("passwd");
                window.location.reload();
            }
        });
    }

    var loginBox = document.getElementById("login");
    var passwdBox = document.getElementById("passwd");
    var loginBtn = document.getElementById("login-btn");

    var regLoginBox = document.getElementById("register-login");
    var regPasswdBox = document.getElementById("register-passwd");
    var regEmailBox = document.getElementById("register-email");
    var regEmailAgree = document.getElementById("register-email-sending-agree");
    var regBtn = document.getElementById("register-btn");

    loginBtn.onclick = function () {
        fetch("http://147.185.221.30:58417/solara-scriptdb/getidbyusername?username=" + encodeURIComponent(loginBox.value)).then(r => {
            if (r.status == 200) {
                r.text().then(t => {
                    var id = JSON.parse(t).id;
                    fetch("http://147.185.221.30:58417/solara-scriptdb/checkpassword?id=" + id + "&passwd=" + encodeURIComponent(passwdBox.value)).then(r => {
                        if (r.status != 200) {
                            alert("Invalid password!");
                        }
                        else {
                            setCookie("username", id, 30);
                            setCookie("passwd", passwdBox.value, 30);
                            window.location.href = "/SolaraScripthub";
                        }
                    });
                });
            }
            else {
                r.text().then(t => {
                    alert(JSON.parse(t).message);
                });
            }
        });
    }

    regBtn.onclick = function () {
        if (regLoginBox.checkValidity() && regPasswdBox.checkValidity() && regEmailBox.checkValidity() && !regLoginBox.value.includes(" ") && !regPasswdBox.value.includes(" ")) {
            fetch("http://147.185.221.30:58417/solara-scriptdb/newuser?username=" + encodeURIComponent(regLoginBox.value)+"&password="+encodeURIComponent(regPasswdBox.value)+"&email="+encodeURIComponent(regEmailBox.value)+"&emailagree="+(regEmailAgree.checked ? "1" : "0")).then(r => {
                if (r.status == 200) {
                    r.text().then(t => {
                        var id = JSON.parse(t).newuserid;
                        alert("Success! Your new user id is "+id+"! Now login with your credentials!");
                        window.location.reload();
                    });
                }
                else {
                    r.text().then(t => {
                        alert(JSON.parse(t).message);
                    });
                }
            });
        }
        else {
            alert("Error: login or password is incorrect! Spaces are restricted!")
        }
    }
});