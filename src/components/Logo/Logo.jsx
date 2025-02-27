import { Link } from "react-router-dom";
import styles from "./Logo.module.scss"; // Якщо є стилі, інакше видали цей імпорт

const Logo = () => {
  return (
    <Link to="/" className={styles.logoContainer}>
      <img src="/path-to-logo.png" alt="LearnLingo Logo" className={styles.logoImage} />
      <span className={styles.logoText}>LearnLingo</span>
    </Link>
  );
};

export default Logo;
