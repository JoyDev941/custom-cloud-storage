import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginCard.css"
import {API_URL} from "../config"

function LoginCard(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function sendDetails(){
        fetch(`${API_URL}/authenticate`,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                username,
                password
            })
        })// send post request
        .then(res => res.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token)
                navigate('/UserCave')
            }
        })//After server process request

    }//API request function

    return (
        <div className="container">
            <h3 className="CardIntro">Log in your retreate</h3>
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

            <button onClick={sendDetails}>Log In</button>

            <a href="/register">Register</a>
            
        </div>
    )
    
}

export default LoginCard;