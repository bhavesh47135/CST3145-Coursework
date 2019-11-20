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
                userObject.Type = localStorage.Type;
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
                if (Password === userObject.Password && localStorage.Type === userObject.Type) {
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
        if (localStorage.Type == "student") {
            document.getElementById("success").innerHTML = "<b>Logging in.</b>"
            location.href="main.html"
        }
        else if (localStorage.Type = "provider") {
            document.getElementById("success").innerHTML = "<b>Logging in.</b>"
            location.href="providerhome.html"
        }
    }
}

function sp1Login() {
    localStorage.Type = "student";
}

function sp2Login() {
    localStorage.Type = "provider";
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

var courses = [
    { 'topic': 'math', 'location': 'hendon', 'price': 100 },
    { 'topic': 'math', 'location': 'colindale', 'price': 80 },
    { 'topic': 'math', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'math', 'location': 'golders green', 'price': 120 },
    { 'topic': 'english', 'location': 'hendon', 'price': 110 },
    { 'topic': 'english', 'location': 'colindale', 'price': 90 },
    { 'topic': 'english', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'english', 'location': 'golders green', 'price': 130 },
    { 'topic': 'piano', 'location': 'hendon', 'price': 120 },
    { 'topic': 'piano', 'location': 'golders green', 'price': 140 }
]

var filterApp = new Vue({
    el: '#filter',
    data: {
        courses: courses,
        selectedTopic: [],
        selectedLocation: [],
    },
    methods: {
        reset: function() {
            this.selectedTopic = [];
            this.selectedLocation = [];
        }
    },
    computed: {
        topics: function () { // return an array of all the topics
            return [...new Set(this.courses.map(x => x.topic))]
            },
        locations: function () {
            return [...new Set(this.courses.map(x => x.location))]
        },
        filteredCourses: function() {
            var topics = this.selectedTopic, locations = this.selectedLocation;
            return this.courses.filter(function(course) {
                var topicMatch = false, locationMatch = false;
                if (topics.length > 0) {
                    if (topics.includes(course.topic)) {
                        topicMatch = true;
                    }
                }
                else {
                    topicMatch = true;
                }
                if (locations.length > 0) {
                    if (locations.includes(course.location)) {
                        locationMatch = true;
                    }
                }
                else {
                    locationMatch = true;
                }
                return topicMatch && locationMatch
            })
        }
    }
})
  
var searchApp = new Vue ({
    el: '#search',
    data: {
        courses: courses,
        searchBar: '',
    },
    methods: {
        reset: function() {
            this.searchBar = [];
        }
    },
    computed: {
        topics: function () { // return an array of all the topics
            return [...new Set(this.courses.map(x => x.topic))]
            },
        locations: function () {
            return [...new Set(this.courses.map(x => x.location))]
        },
        filteredList() {
            return this.courses.filter(courses => {
            return courses.topic.toLowerCase().includes(this.searchBar.toLowerCase())
            })
        }
    }
})

var sortpriceApp = new Vue ({
    el: '#sortPrice',
    data: {
        courses: courses,
    },
    computed: {
        sortedArray: function() {
            function compare(a, b) {
                if (a.price < b.price)
                    return -1;
                    if (a.price > b.price)
                        return 1;
                        return 0;
                }
            return this.courses.sort(compare);
        }
    }
})

