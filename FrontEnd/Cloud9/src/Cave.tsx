import styles from "./css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "./config"

function Cave(){
    const [files, setFiles] = useState([]) //stores the name of the folder content, based on current location
    const [selectedFile, setSelectedFile] = useState<string | null>(null) //stores the file names based on selection in the ui
    const navigate = useNavigate()


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

    useEffect(() =>{
        const token = localStorage.getItem('token')

        fetch(`${API_URL}/UserCave`, {
            method : 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({token: token})
        })
        .then(res => res.json())
        .then(data => setFiles(data.content))

    }, [])

    function Downl(){
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

    useEffect(() => {
        fetchFiles()  // just call the function here
    }, [])

    function Uplod(){
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
                fetchFiles()
            })
        }


    }

    function Del(){
        const token = localStorage.getItem('token')

        if(!selectedFile) return

        fetch(`${API_URL}/Del`,{
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({token : token, filename : selectedFile})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.status)
            fetchFiles()
        })


    }

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationBar}>
                <button
                onClick={Downl}
                disabled={!selectedFile}
                >Download </button>

                <button
                onClick={Uplod}
                >Upload</button>

                <button
                onClick={Del}
                disabled={!selectedFile}
                >Delete</button>

                <button 
                onClick={LogOut}
                >Log out</button>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.leftBar}></div>

                <div className={styles.userContent}>
                    {/* apply fileCard always, selected only if this file is clicked */}
                    {files.map((file, index) =>(
                        <div 
                        key={index}
                        className={`${styles.fileCard} ${selectedFile === file ? styles.selected : ''}`}
                        onClick={() => setSelectedFile(file)}
                        >
                        {/* render file name */}
                        {file} </div>))}  
                </div>
            </div>
        </div>
    )
}

export default Cave;