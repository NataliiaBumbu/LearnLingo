import { useState, useEffect } from "react";
import { getFavoriteTeachers } from "../../services/firebase";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoriteTeachers().then(setFavorites);
  }, []);

  return (
    <div className={styles.page}>
      <h2>Обрані викладачі</h2>
      {favorites.length > 0 ? (
        favorites.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
      ) : (
        <p>У вас поки немає обраних викладачів.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
