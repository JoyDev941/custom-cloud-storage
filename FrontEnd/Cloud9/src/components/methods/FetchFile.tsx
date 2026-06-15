import { API_URL } from "../../config"

function fetchFiles(){
    const token = localStorage.getItem('token')
    fetch(`${API_URL}/UserCave`, {
        method : 'POST',
        headers:{ 'content-type': 'application/json' },
        body: JSON.stringify({token: token})
    })
    .then(res => res.json())
    .then(data => setFiles(data.content))
    }