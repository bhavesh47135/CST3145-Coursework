function login() {
    var Username = document.getElementById("LoginUsername").value;
    var Password = document.getElementById("LoginPassword").value;

    if (localStorage[Username] === undefined) {
        document.getElementById("loginFailure").innerHTML = "Username not recognized.";
        return;
    }
    else {
        var userObject = JSON.parse(localStorage[Username]);
        if (Password === userObject.Password) {
            document.getElementById("loginPara").innerHTML = "Welcome " + userObject.Username + "!";
            document.getElementById("loginFailure").innerHTML = "";
            localStorage.loggedInUser = userObject.Username;
        }
        else {
            document.getElementById("loginFailure").innerHTML = "Password is incorrect.";
        }
    }
}

function storeUser() {
    var userObject = {};
    var Username = document.getElementById("UsernameInput").value;

    if (Username == null || Username == "") {
        document.getElementById("result").innerHTML = "<b>Enter a valid Username.</b>";
    }
    else {
        localStorage[userObject.Username] = JSON.stringify(userObject);
        var Password = document.getElementById("PasswordInput").value;
        if (Password == null || Password == "") {
            document.getElementById("result").innerHTML = "<b>Enter a valid Password.</b>"
        }
        else {
            userObject.Username = document.getElementById("UsernameInput").value;
            userObject.Password = document.getElementById("PasswordInput").value;
            localStorage[userObject.Username] = JSON.stringify(userObject);
            document.getElementById("result").innerHTML = "<b>Registration successful.</b>";
            document.getElementById("UsernameInput").disabled = true;
            document.getElementById("PasswordInput").disabled = true;
        }
    }
}

function proceed() {
    if (localStorage.loggedInUser === undefined) {
        document.getElementById("success").innerHTML = "<b>Please log in.</b>"
    }
    else {
        document.getElementById("success").innerHTML = "<b>Logging in.</b>"
        location.href="main.html"
    }
}

function pLogin() {
    localStorage.Type = "Parent";
}

function sLogin() {
    localStorage.Type = "Student";
}