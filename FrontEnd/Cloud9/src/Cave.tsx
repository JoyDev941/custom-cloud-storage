import styles from "./css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";

function Cave(){
    const [files, setFiles] = useState([]) //stores the name of the folder content, based on current location
    const [selectedFile, setSelectedFile] = useState<string | null>(null) //stores the file names based on selection in the ui

    useEffect(() =>{
        const token = localStorage.getItem('token')

        fetch('http://192.168.68.102:52026/UserCave', {
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

        fetch('http://192.168.68.102:52026/Downl', {
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

    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationBar}>
                <button
                onClick={Downl}
                disabled={!selectedFile}> Download </button>
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