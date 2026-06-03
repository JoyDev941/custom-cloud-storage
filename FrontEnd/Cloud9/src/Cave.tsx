import styles from "./css/Cave.module.css"
import { useState } from "react";
import { useEffect } from "react";

function Cave(){
    const [files, setFiles] = useState([])

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

    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationBar}></div>
            <div className={styles.mainContent}>
                <div className={styles.leftBar}></div>

                <div className={styles.userContent}>
                    {files.map((file, index) =>(
                        <div key={index} className={styles.fileCard}>
                            {file}
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Cave;