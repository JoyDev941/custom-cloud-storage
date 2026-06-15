import styles from "./css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "./config";
import uploadIcon from "./assets/icons/1.png";
import userIcon from "./assets/icons/3.png";
import userMessage from "./assets/icons/4.png";
import userCalendar from "./assets/icons/5.png";



import Del from "./components/methods/Del";
import Uplod from './components/methods/Uplod';
import tempBin from './assets/tempbin.png';

//import { Del } from './components/methods/Del'

function Cave(){
    const [files, setFiles] = useState([]) //stores the name of the folder content, based on current location
    const [selectedFile, setSelectedFile] = useState<string | null>(null) //stores the file names based on selection in the ui
    const navigate = useNavigate()
    

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


     function getIcon(ext : string){

        if(ext === ".png" || ext === ".jpg" || ext === ".jpeg") return "🖼️"
        if(ext === ".pdf") return "📄"
        if(ext === ".txt") return "📝"
        if(ext === ".mp4" || ext === ".mov") return "🎥"
        if(ext === ".mp3") return "🎵"

        return "📁"
    }

    const handleDelete = () => Del(selectedFile, fetchFiles)
    const handleUpload = () => Uplod(fetchFiles)

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    


    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationBar}>
                <input className={styles.search}></input>
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
                <button className={styles.cBtn} onClick={handleUpload}>
                    <img src={uploadIcon} alt="upload" width={50}></img>
                </button>

                <button className={styles.ca2Btn} onClick={handleUpload}>
                    <img src={userIcon} alt="upload" width={50}></img>
                </button>

                <button className={styles.c2Btn} onClick={handleUpload}>
                    <img src={userMessage} alt="upload" width={50}></img>
                </button>

                <button className={styles.c2Btn} onClick={handleDelete}>
                    <img src={tempBin} alt="tempBin" width={50}></img>
                </button>

            </div>
            
        </div>
    )
}

export default Cave;