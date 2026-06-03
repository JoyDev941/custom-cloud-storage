import LoginCard from "./components/loginCard";
import { Fragment } from "react/jsx-runtime";
import styles from './css/index.module.css'

function LoginPage() {

  return (
    <div className={styles.wrapper}> 
        <LoginCard></LoginCard>
    </div>

  )
}

export default LoginPage;
