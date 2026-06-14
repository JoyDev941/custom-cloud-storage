import styles from "./css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "./config";
import uploadIcon from "./assets/icons/1.png";
import userIcon from "./assets/icons/3.png";
import userMessage from "./assets/icons/4.png";
import userCalendar from "./assets/icons/5.png";

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

    function getIcon(ext : string){

        if(ext === ".png" || ext === ".jpg" || ext === ".jpeg") return "🖼️"
        if(ext === ".pdf") return "📄"
        if(ext === ".txt") return "📝"
        if(ext === ".mp4" || ext === ".mov") return "🎥"
        if(ext === ".mp3") return "🎵"

        return "📁"
    }

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationBar}>
                <input className={styles.search}></input>

                {/* <button
                className={styles.navBtn}
                onClick={Downl}
                disabled={!selectedFile}
                >Download </button>

                <button
                className={styles.navBtn}
                onClick={Uplod}
                >Upload</button>

                <button
                className={styles.navBtn}
                onClick={Del}
                disabled={!selectedFile}
                >Delete</button>

                <button 
                className={styles.navBtn}
                onClick={LogOut}
                >Log out</button> */}
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.dirBrowse}>Home, Drive, Bin</div>
                <div className={styles.storageQuota}>Storage</div>
            </div>


            <div className={styles.mainContent}>
                {Object.entries(files).map(([filename, ext], index) => (
                    <div
                    key={index}
                    className={`${styles.fileCard} ${selectedFile === filename+ext ? styles.selected : ''}`}
                    onClick={() => setSelectedFile(filename+ext)}
                    >
                        <span>{getIcon(ext)}</span>
                        <span>{filename}{ext}</span>
                    </div>
                ))}
            </div>


            <div className={styles.toolColumn}>
                <button className={styles.cBtn} onClick={Uplod}>
                    <img src={uploadIcon} alt="upload" width={50}></img>
                </button>

                <button className={styles.cBtn} onClick={Downl}>
                    <img src={uploadIcon} alt="download" width={50}></img>
                </button>

                <button className={styles.ca2Btn} onClick={Uplod}>
                    <img src={userIcon} alt="upload" width={50}></img>
                </button>

                <button className={styles.c2Btn} onClick={Uplod}>
                    <img src={userMessage} alt="upload" width={50}></img>
                </button>

                <button className={styles.c2Btn} onClick={Uplod}>
                    <img src={userCalendar} alt="upload" width={50}></img>
                </button>

            </div>
            
        </div>
    )
}

export default Cave;