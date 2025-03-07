import { useState, useEffect } from "react";
import { auth, isFavorite, toggleFavorite } from "../../services/firebase";
import TeacherCardHeader from "./TeacherCardHeader/TeacherCardHeader";
import styles from "./TeacherCard.module.scss";

const TeacherCard = ({ teacher, selectedLevel }) => {
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (authUser) {
        setFavorite(isFavorite(authUser.uid, teacher.name));
      }
    });
    return unsubscribe;
  }, [teacher.name]);

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Ця функція доступна тільки для авторизованих користувачів.");
      return;
    }
    toggleFavorite(user.uid, teacher.name);
    setFavorite((prev) => !prev);
  };

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={teacher.avatar_url}
          alt={teacher.name}
        />
        <div className={styles.headerContent}>
          <TeacherCardHeader
            name={teacher.name}
            surname={teacher.surname}
            languages={teacher.languages}
            lessonsDone={teacher.lessons_done}
            rating={teacher.rating}
            pricePerHour={teacher.price_per_hour}
          />
        </div>
        <button className={styles.favoriteBtn} onClick={handleFavoriteClick}>
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.details}>
        <p>
          <strong>Speaks:</strong> {teacher.languages.join(", ")}
        </p>
        <p>
          <strong>Lesson Info:</strong> {teacher.lesson_info}
        </p>
        <p>
          <strong>Conditions:</strong> {teacher.conditions.join(" ")}
        </p>

        <button
          className={styles.readMore}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Hide details" : "Read more"}
        </button>

        {expanded && (
          <div className={styles.reviews}>
            <h4>Reviews</h4>
            {teacher.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <p className={styles.reviewName}>
                  <strong>{review.reviewer_name}</strong>
                </p>
                <p className={styles.reviewText}>{review.comment}</p>
                <p className={styles.reviewRating}>
                  ⭐ {review.reviewer_rating}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.levels}>
          {teacher.levels.map((level, index) => (
            <span
              key={index}
              className={`${styles.level} ${
                selectedLevel === level ? styles.selectedLevel : ""
              }`}
            >
              {level}
            </span>
          ))}
        </div>

        {expanded && (
          <button className={styles.bookButton}>Book trial lesson</button>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
