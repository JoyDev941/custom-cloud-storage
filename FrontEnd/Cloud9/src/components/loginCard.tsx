import { useState } from "react";
import "../css/loginCard.css"

function LoginCard(){
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")

    function sendDetails(){
        fetch("http://127.0.0.1:52026/authenticate",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                username,
                password
            })
        })// send post request
        .then(res => res.json())
        .then(data => {
            console.log(data.token)
        })//After server process request

    }//API request function

    return (
        <div className="container">
            <h3 className="CardIntro">Log in your retreate</h3>
            <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>

            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={sendDetails}>Log In</button>
            
        </div>
    )
    
}

export default LoginCard;