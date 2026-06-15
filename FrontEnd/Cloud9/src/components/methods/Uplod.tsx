import { API_URL } from "../../config"
    
export default function Uplod(onSuccess: () => void){
    const token = localStorage.getItem('token')

    const input = document.createElement('input')
    input.type = 'file'
    input.click()

    //its a event lister, where it waits until the user upload the file
    input.onchange = () => {
        const file = input.files?.[0]
        if(!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('token', token || '')
        
        fetch(`${API_URL}/Uplod`, {
            method: 'POST',
            body: formData  // no content-type header needed, browser sets it automatically
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            onSuccess()
        })
    }


}