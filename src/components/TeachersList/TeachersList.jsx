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
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const maxPrice = parseInt(filters.price, 10);
      const matchesPrice = teacher.price_per_hour <= maxPrice;
      const matchesLevel = filters.level
        ? teacher.levels.includes(filters.level)
        : true;
      const matchesLanguage = filters.language
        ? teacher.languages.includes(filters.language)
        : true;

      return matchesPrice && matchesLevel && matchesLanguage;
    });
  }, [teachers, filters]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <div className={styles.container}>
      {filteredTeachers.slice(0, visibleCount).map((teacher) => (
        <TeacherCard
          key={teacher.id || teacher.name}
          teacher={teacher}
          selectedLevel={filters.level}
        />
      ))}

      {visibleCount < filteredTeachers.length && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default TeachersList;