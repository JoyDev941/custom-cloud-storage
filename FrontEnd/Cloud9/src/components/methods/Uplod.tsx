import { API_URL } from "../../config"

export default function Uplod(onSuccess: () => void, currentPath: string){
    const token = localStorage.getItem('token')

    const input = document.createElement('input')
    input.type = 'file'
    input.click()

    input.onchange = () => {
        const file = input.files?.[0]
        if(!file) return

        console.log("Uploading to path:", currentPath)  // debug

        const formData = new FormData()
        formData.append('file', file)
        formData.append('token', token || '')
        formData.append('current_dir', currentPath)
        
        fetch(`${API_URL}/Uplod`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "ok") {
                console.log("Upload successful")
                onSuccess()
            } else {
                console.error("Upload failed:", data)
            }
        })
        .catch(err => console.error("Upload error:", err))
    }
}