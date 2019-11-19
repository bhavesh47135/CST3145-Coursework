var signupApp = new Vue ({
    el: '#signupForm',
    data: {
    username: '',
    password: '',
    },
    methods: {
        onSubmit: function() {
            var userObject = {};
            var usernameInput = document.getElementById("username").value;
            var passwordInput = document.getElementById("password").value;
            if (usernameInput != "" && passwordInput != "") {
                localStorage[userObject.Username] = JSON.stringify(userObject);
                userObject.Username = usernameInput;
                userObject.Password = passwordInput;
                localStorage[userObject.Username] = JSON.stringify(userObject);
                alert("Registration Successful!");
            }
        }
    } 
})

var loginApp = new Vue({
    el: '#loginForm',
    data: {
    userName: '',
    passWord: '',
    },
    methods: {
        onSubmit: function() {
            var username = document.getElementById("userName").value;
            var Password = document.getElementById("passWord").value;
            if (localStorage[username] === undefined) {
                alert("Username not recognized.");
            }
            else {
                var userObject = JSON.parse(localStorage[username]);
                if (Password === userObject.Password) {
                    document.getElementById("loginForm").innerHTML = "Welcome " + username + "!";
                    localStorage.loggedInUser = username;
                }
                else {
                    alert("Password not recognized.");
                }
            }
        }
    }
})

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

function signOut() {
    var confirmation = confirm("Are you sure you want to Log Out?");
    if (confirmation == true) {
        if (localStorage.loggedInUser === undefined || localStorage.loggedInUser == "") {
            alert("You are not currently logged in.");
        }
        else {
            alert("Successfully logged out!");
            localStorage.loggedInUser = "";
            location.href="startpage.html";
        }
    }
}