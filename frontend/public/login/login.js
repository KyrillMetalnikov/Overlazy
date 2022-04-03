function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    endpoint = 'https://www.tokeybee.com/4537/API/V1/login/';
    setDisabledLoginFormButtons(true);
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
            // res.json().then(res => {throw new Error(res)});  // res message needs to be sent as json to be readable
            throw new Error("not again..");
        }
        triggerActionSuccessUx();
    })
    .catch(err => {
        triggerActionFailUx();
    })
}

function deleteAccount() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    endpoint = 'https://www.tokeybee.com/4537/API/V1/login/';
    setDisabledLoginFormButtons(true);
    fetch(endpoint,
    {   headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept' : 'text/plain;charset=UTF-8',
    },   
        method: 'DELETE',
        body: JSON.stringify({
            username: username,
            password: password
            })
    })
    .then(res => {
        if (!res.ok) {
            // res.json().then(res => {throw new Error(res)});  // res message needs to be sent as json to be readable
            throw new Error("not again..");
        }
        triggerActionSuccessUx();
    })
    .catch(err => {
        triggerActionFailUx();
    })
}

function register() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    endpoint = 'https://www.tokeybee.com/4537/API/V1/signup/';
    setDisabledLoginFormButtons(true);
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
            // res.json().then(res => {throw new Error(res)});  // res message needs to be sent as json to be readable
            throw new Error("not again..");
        }
        triggerActionSuccessUx();
    })
    .catch(err => {
        triggerActionFailUx();
    })
}

function triggerActionFailUx() {
    setDisabledLoginFormButtons(false);
    document.getElementById("actionInfo").style.display = "block";
    document.getElementById("actionInfo").style.color = "red";
    document.getElementById("actionInfo").innerText = "Action Failed";
    //document.getElementById("loginError").innerText = res;  // res message needs to be sent as json to be readable
}

function triggerActionSuccessUx() {
    setDisabledLoginFormButtons(false);
    document.getElementById("actionInfo").style.display = "block";
    document.getElementById("actionInfo").style.color = "black";
    document.getElementById("actionInfo").innerText = "Action Success";
    //document.getElementById("loginError").innerText = res;  // res message needs to be sent as json to be readable
}

function setDisabledLoginFormButtons(disabled) {
    $(".loginFormButton").prop('disabled', disabled);
}