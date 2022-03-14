let loggedIn = false;
// extremely safe authentication securty

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    endpoint = 'https://www.tokeybee.com/4537/API/V1/login/';
    document.getElementById("loginButton").disabled = true
    fetch(endpoint,
    {   headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept' : 'text/plain;charset=UTF-8',
    },   
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
            })
    })
    .then(res => {
        if (!res.ok) {
            // response code was not in 200 range
            throw new Error("oof")
        }
        loggedIn = true;
        displayStats();
        document.getElementById("login").style.display = "none";
        document.getElementById("stats").style.display = "block";
    })
    .catch(err => {
        document.getElementById("loginButton").disabled = false;
        document.getElementById("loginError").style.display = "block";
    })
}

function displayStats() {
    fetch(`https://www.tokeybee.com/4537/API/V1/admin/?auth=${loggedIn}`)
    .then(res => {
      return res.json();  
    })
    .then(data => {
        document.getElementById("data").innerText = JSON.stringify(data, null, 2);
    })
}