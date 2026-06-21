import styles from "../css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../config";

import uploadIcon from "../assets/icons/1.png";
import userIcon from "../assets/icons/3.png";
import userMessage from "../assets/icons/4.png";
import userCalendar from "../assets/icons/5.png";
import tempBin from '../assets/tempbin.png';

import Del from "../components/methods/Del";
import Uplod from '../components/methods/Uplod';
import Downl from '../components/methods/Downl';
import getIcon from '../components/methods/getIcon';


function Cave(){

    const [files, setFiles] = useState([]) //stores the name of the folder content, based on current location
    const [selectedFile, setSelectedFile] = useState<string | null>(null) //stores the file names based on selection in the ui
    const [currentPath, setCurrentPath] = useState<string>("/")

    const handleDelete = () => Del(selectedFile, fetchFiles)
    const handleUpload = () => Uplod(fetchFiles, currentPath)
    const handleDownload = () => Downl(selectedFile)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    //------------------------------------------------------------------------
    //------------------------------------------------------------------------

    function handleDoubleClick(
        filename: string,
        ext : string,
        currentPath : string,
        setCurrentPath : (path: string) => void, 
        )
        {
            if(ext === "folder") {
            setCurrentPath(currentPath + filename + "/")
            fetchFiles()
            }
        }
    
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    function fetchFiles(){
        const token = localStorage.getItem('token')
        fetch(`${API_URL}/UserCave`, {
            method : 'POST',
            headers:{ 'content-type': 'application/json' },
            body: JSON.stringify({token: token, current_dir : currentPath})
        })
        .then(res => res.json())
        .then(data => setFiles(data.content))
    }

    useEffect(() => {
        fetchFiles()  // just call the function here
    }, [])

    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
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
                    onDoubleClick={() => handleDoubleClick(filename, ext, currentPath, setCurrentPath)}
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

                <button className={styles.c2Btn} onClick={handleLogout}>
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