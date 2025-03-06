import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import logInIcon1x from "../../assets/log-in-01.png";
import logInIcon2x from "../../assets/log-in-01@2x.png";
import RegistrationModal from "../Modal/RegistrationModal/RegistrationModal";
import LoginModal from "../Modal/LoginModal/LoginModal";

const Header = () => {
  const [modal, setModal] = useState(null); // 'login' | 'register' | null

  // Закриття по Escape
  useEffect(() => {
    if (!modal) return;
    
    const handleEscape = (e) => {
      if (e.key === "Escape") setModal(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modal]);

  const toggleModal = (type) => setModal((prev) => (prev === type ? null : type));

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
        <button className={styles.loginButton} onClick={() => toggleModal("login")}>
          <img 
            src={logInIcon1x} 
            srcSet={`${logInIcon1x} 1x, ${logInIcon2x} 2x`} 
            alt="Log in" 
            className={styles.icon} 
          />
          Log in
        </button>
        <button className={styles.registerButton} onClick={() => toggleModal("register")}>
          Registration
        </button>
      </div>
    
      

      {/* Модальні вікна */}
      <LoginModal isOpen={modal === "login"} onClose={() => setModal(null)} />
      <RegistrationModal isOpen={modal === "register"} onClose={() => setModal(null)} />
    </header>
  );
};

export default Header;
