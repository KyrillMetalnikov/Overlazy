function post() {
    sendRequest("post");
}

function del() {
    sendRequest("delete");
}

function put() {
    sendRequest("put");
}

function get(dataHandler) {
    id = $("#user_id")[0].value;
    fetch(`https://www.tokeybee.com/4537/API/V1/images/?userId=${id}`)
    .then(res => {
      return res.json();  
    })
    .then(data => {
        dataHandler(data)
        
    })
}

function dataLoader(data) {
    let tableBody = document.createElement("tbody");
    tableBody.id = "tableData";
    $("#tableData").replaceWith(tableBody);
    for (let i = 0; i < data.length; i++) {
        $("#tableData").append(
            `<tr>
              <td>${data[i].images_date}</td>
              <td>${data[i].images_link}</td>
              <td>${data[i].images_id}</td>
            </tr>`
        )
    }
}

function sendRequest(type) {
    let formData = new FormData(document.getElementById(`${type}-form`));
    let formDataJson = Object.fromEntries(formData.entries());
    endpoint = 'https://www.tokeybee.com/4537/API/V1/images/';
    setDisabledFormButtons(true);
    fetch(endpoint,
        {   headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept' : 'text/plain;charset=UTF-8',
        },   
            method: type,   
            body: JSON.stringify(formDataJson)
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
    setDisabledFormButtons(false);
    document.getElementById("actionInfo").style.display = "block";
    document.getElementById("actionInfo").style.color = "red";
    document.getElementById("actionInfo").innerText = "Action Failed";
}

function triggerActionSuccessUx() {
    setDisabledFormButtons(false);
    document.getElementById("actionInfo").style.display = "block";
    document.getElementById("actionInfo").style.color = "black";
    document.getElementById("actionInfo").innerText = "Action Success";
}

function setDisabledFormButtons(disabled) {
    $(".formButton").prop('disabled', disabled);
}