import { API_URL } from "../../config"

export default function Downl(selectedFile: string | null){
    if(!selectedFile) return

    const token = localStorage.getItem('token')

    fetch(`${API_URL}/Downl`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({token : token, filename: selectedFile}) //should be changed to dynamic
    })
    .then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = selectedFile
        a.click()
        window.URL.revokeObjectURL(url)
    })
}