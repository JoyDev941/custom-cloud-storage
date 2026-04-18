function sendData(){
    const user = document.getElementById("username").value;
    const passw = document.getElementById("password").value;

    const data = {
        "username": user,
        "password": passw
    }

    fetch("http://127.0.0.1:8000/authenticate",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result =>{
        console.log("Server response: ", result);

        if(result.status === "pass"){
            window.location.href = "home.html";
        }else{
            alert("login failed");
        }

    })
    .catch(error =>{
        console.error("Error: ", error);
    });

}