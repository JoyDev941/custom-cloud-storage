function sendData(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        "username": username,
        "password": password
    }

    fetch("http://127.0.0.1:8000/authenticate", 
        {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result) /* token received! 14-10*/
        })
        .catch(err => {
            console.log(err);
        })


}