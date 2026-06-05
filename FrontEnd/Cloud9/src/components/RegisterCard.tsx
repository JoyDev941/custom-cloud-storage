import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginCard.css"

function LoginCard(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function sendDetails(){
        fetch("http://192.168.68.102:52026/register", {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({username : username, password: password})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.status)
            if(data.status == "ok"){
                navigate('/login')
            }
            else{
                console.log("Error, user might already exists, or backend problem")
            }
        })
    }

    return (
        <div className="container">
            <h3 className="CardIntro">Create your retreat</h3>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={sendDetails}>Register</button>
            <a href="/login">Already registered?</a>
            
        </div>
    )
    
}

export default LoginCard;