import { API_URL } from "../../config"


export default function Del(selectedFile : string | null, onSuccess: () => void){
        const token = localStorage.getItem('token')

        if(!selectedFile) return

        fetch(`${API_URL}/Del`,{
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({token : token, filename : selectedFile})
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok"){
                onSuccess()
            }
        })


    }