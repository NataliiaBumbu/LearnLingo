import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import logInIcon1x from "../../assets/log-in-01.png"; 
import logInIcon2x from "../../assets/log-in-01@2x.png"; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>Home</a>
        <a href="#" className={styles.navLink}>Teachers</a>
      </nav>

      <div className={styles.buttonContainer}>
        <button className={styles.loginButton}>
          <img 
            src={logInIcon1x} 
            srcSet={`${logInIcon1x} 1x, ${logInIcon2x} 2x`} 
            alt="Log in" 
            className={styles.icon} 
          />
          Log in
        </button>
        <button className={styles.registerButton}>Registration</button>
      </div>
    </header>
  );
};

export default Header;
