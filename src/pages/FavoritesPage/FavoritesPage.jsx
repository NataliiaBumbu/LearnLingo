import { useState, useEffect } from "react";
import { auth, getFavoriteTeachers } from "../../services/firebase";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import styles from "./FavoritesPage.module.scss";
import Header from "../../components/Header/Header";

const FavoritesPage = () => {
  const [user, setUser] = useState(null);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favorites = await getFavoriteTeachers(user.uid);
        console.log("📌 Отримані улюблені викладачі:", favorites);
        
        // Оновлюємо список викладачів із гарантованим experience
        const updatedFavorites = favorites.map((teacher) => ({
          ...teacher,
          experience:
            Array.isArray(teacher.experience)
              ? teacher.experience.join(" ")
              : teacher.experience || "No experience provided",
        }));

        setFavoriteTeachers(updatedFavorites);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleFavoriteUpdate = async () => {
    if (user) {
      const favorites = await getFavoriteTeachers(user.uid);
      setFavoriteTeachers(favorites);
    }
  };

  return (
    
    <div className={styles.container}>
      <Header />
      {favoriteTeachers.length > 0 ? (
        favoriteTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher} // Передаємо дані, які вже відформатовані
            onFavoriteUpdate={handleFavoriteUpdate}
          />
        ))
      ) : (
        <p>❌ У вас поки що немає обраних викладачів.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
