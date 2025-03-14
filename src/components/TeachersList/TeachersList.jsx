import { useState, useEffect, useMemo } from "react";
import styles from "./TeachersList.module.scss";
import TeacherCard from "../TeacherCard/TeacherCard";
import { getTeachers } from "../../services/firebase";

const TeachersList = ({ filters }) => {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      console.log("📌 Всі викладачі:", data); // Лог для перевірки
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      if (!teacher) return false;
      const maxPrice = parseInt(filters.price, 10);
      const matchesPrice = teacher.price_per_hour <= maxPrice;
      const matchesLevel = filters.level
        ? teacher.levels?.includes(filters.level)
        : true;
      const matchesLanguage = filters.language
        ? teacher.languages?.includes(filters.language)
        : true;

      return matchesPrice && matchesLevel && matchesLanguage;
    });
  }, [teachers, filters]);

  return (
    <div className={styles.container}>
      {filteredTeachers.length > 0 ? (
        filteredTeachers.slice(0, visibleCount).map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            selectedLevel={filters.level}
          />
        ))
      ) : (
        <p>❌ Викладачів не знайдено</p>
      )}
    </div>
  );
};

export default TeachersList;
