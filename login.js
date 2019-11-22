var signupApp = new Vue({
    el: '#signupForm',
    data: {
        username: '',
        password: '',
    },
    methods: {
        onSubmit: function() {
            var userObject = {};
            var usernameInput = this.username;
            var passwordInput = this.password;
            if (usernameInput != "" && passwordInput != "" && /\S+@\S+\.\S+/.test(usernameInput)) {
                localStorage[userObject.username] = JSON.stringify(userObject);
                userObject.username = usernameInput;
                userObject.password = passwordInput;
                userObject.type = localStorage.Type;
                localStorage[userObject.username] = JSON.stringify(userObject);
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
            var username = this.userName;
            var password = this.passWord;
            if (localStorage[username] === undefined) {
                alert("E-Mail not recognized.");
            }
            else {
                var userObject = JSON.parse(localStorage[username]);
                if (password === userObject.password && localStorage.Type === userObject.type) {
                    alert("Successfully logged in!");
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
        alert("Please log in.");
    }
    else {
        if (localStorage.Type == "student") {
            location.href="main.html"
        }
        else if (localStorage.Type = "provider") {
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
    { 'topic': 'art', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'math', 'location': 'golders green', 'price': 120 },
    { 'topic': 'english', 'location': 'hendon', 'price': 110 },
    { 'topic': 'chemistry', 'location': 'colindale', 'price': 90 },
    { 'topic': 'english', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'english', 'location': 'golders green', 'price': 130 },
    { 'topic': 'biology', 'location': 'hendon', 'price': 120 },
    { 'topic': 'chemistry', 'location': 'golders green', 'price': 140 }
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

var sortpriceApp1 = new Vue ({
    el: '#sortPrice1',
    data: {
        courses: courses,
    },
    computed: {
        sortedArray: function() {
            function compare(a, b) {
                if (a.price > b.price)
                    return -1;
                    if (a.price < b.price)
                        return 1;
                        return 0;
                }
            return this.courses.sort(compare);
        }
    }
})

var sortpriceApp2 = new Vue ({
    el: '#sortPrice2',
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

function priceHighToLow() {
    document.getElementById("sortPrice1").style.display = "inline-block";
    document.getElementById("sortPrice2").style.display = "none";
}

function priceLowToHigh() {
    document.getElementById("sortPrice1").style.display = "none";
    document.getElementById("sortPrice2").style.display = "inline-block";
}

/*var reviewApp = new Vue ({
    el: '#reviews',
    data: {
        activities = [],
        stars = [],
        reviews = [],
        activity = '',
        star = '',
        review = '',
    },
    methods: {
        onSubmit: function() {
            var activity = this.activity;
            var star = this.star;
            var review = this.review;
        }
    }
})*/