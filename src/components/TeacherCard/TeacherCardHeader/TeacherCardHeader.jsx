import styles from "./TeacherCardHeader.module.scss";
import onlineLessonIcon from "../../../assets/online-lesson.svg"; // Шлях до SVG

const TeacherCardHeader = ({ name, surname, lessonsDone, rating, pricePerHour }) => {
  return (
    <div className={styles.header}>
      {/* Блок з ім'ям та мовами */}
      <div className={styles.left}>
        <p className={styles.languagesTitle}>Languages</p>
        <p className={styles.name}>{name} {surname}</p>
      </div>

      {/* Блок з інформацією про уроки */}
      <div className={styles.right}>
        <div className={styles.infoBlock}>
          <p className={styles.text}>
            <img src={onlineLessonIcon} alt="Lessons Online" className={styles.icon} />
            Lessons online
          </p>
          <span className={styles.divider}></span>
          <p className={styles.text}>
            Lessons done: {lessonsDone}
          </p>
          <span className={styles.divider}></span>
          <p className={styles.text}>
            ⭐ Rating: {rating}
          </p>
          <span className={styles.divider}></span>
          <p className={`${styles.text} ${styles.price}`}>
            Price / 1 hour: <span>${pricePerHour}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherCardHeader;
