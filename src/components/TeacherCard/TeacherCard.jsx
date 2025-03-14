import { useState, useEffect } from "react";
import { auth, isFavorite, toggleFavorite } from "../../services/firebase";
import TeacherCardHeader from "./TeacherCardHeader/TeacherCardHeader";
import styles from "./TeacherCard.module.scss";

const TeacherCard = ({ teacher, selectedLevel, onFavoriteUpdate }) => {
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user && teacher.id) {
        const isFav = await isFavorite(user.uid, teacher.id);
        setFavorite(isFav);
      }
    };

    checkFavorite();
  }, [user, teacher.id]);

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("Ця функція доступна тільки для авторизованих користувачів.");
      return;
    }

    await toggleFavorite(user.uid, teacher);
    setFavorite((prev) => !prev);

    if (onFavoriteUpdate) {
      onFavoriteUpdate();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={teacher.avatar_url || "https://via.placeholder.com/100"}
          alt={teacher.name || "Unknown"}
        />
        <div className={styles.headerContent}>
          <TeacherCardHeader
            name={teacher.name || "Unknown"}
            surname={teacher.surname || ""}
            languages={teacher.languages || []}
            lessonsDone={teacher.lessons_done || 0}
            rating={teacher.rating || "N/A"}
            pricePerHour={teacher.price_per_hour || "N/A"}
          />
        </div>
        <button className={styles.favoriteBtn} onClick={handleFavoriteClick}>
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.details}>
        <p><strong>Speaks:</strong> {Array.isArray(teacher.languages) ? teacher.languages.join(", ") : "Unknown"}</p>
        <p><strong>Lesson Info:</strong> {teacher.lesson_info || "No info available"}</p>
        <p><strong>Conditions:</strong> {Array.isArray(teacher.conditions) ? teacher.conditions.join(" ") : "No conditions provided"}</p>

        <button className={styles.readMore} onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? "Hide details" : "Read more"}
        </button>

        {expanded && (
          <div className={styles.extraDetails}>
            <p> {teacher.experience ? (Array.isArray(teacher.experience) ? teacher.experience.join(" ") : teacher.experience) : "No experience provided"}</p>

            <div className={styles.reviews}>
    
              {teacher.reviews && teacher.reviews.length > 0 ? (
                teacher.reviews.map((review, index) => (
                  <div key={index} className={styles.review}>
                    <p className={styles.reviewName}><strong>{review.reviewer_name}</strong></p>
                    <p className={styles.reviewText}>{review.comment}</p>
                    <p className={styles.reviewRating}>⭐ {review.reviewer_rating}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        )}

        <div className={styles.levels}>
          {teacher.levels?.length > 0 ? (
            teacher.levels.map((level, index) => (
              <span key={index} className={`${styles.level} ${selectedLevel === level ? styles.selectedLevel : ""}`}>
                {level}
              </span>
            ))
          ) : (
            <p>No levels available</p>
          )}
        </div>

        {/* ✅ Додано кнопку "Book trial lesson" */}
        {expanded && (
          <button className={styles.bookButton}>Book trial lesson</button>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
