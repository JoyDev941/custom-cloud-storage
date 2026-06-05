import RegisterCard from "./components/RegisterCard";
import { Fragment } from "react/jsx-runtime";
import styles from './css/index.module.css'

function LoginPage() {

  return (
    <div className={styles.wrapper}> 
        <RegisterCard />
    </div>

  )
}

export default LoginPage;
