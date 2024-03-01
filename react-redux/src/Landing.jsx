import { Link } from 'react-router-dom'
import styles from './Styles/Landing.module.css';
function Landing() {
  return (
    <div className={styles.body}>
        <div className={styles.buttons}>
        <Link to="/Signup"><button className={styles.button}>Signup</button></Link>
        <Link to="/Login"><button className={styles.button}>Login</button></Link>
        </div>
    </div>
  )
}

export default Landing