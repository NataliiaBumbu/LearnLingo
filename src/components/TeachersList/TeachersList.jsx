import { useState, useEffect, useMemo, useRef } from "react";
import styles from "./TeachersList.module.scss";
import TeacherCard from "../TeacherCard/TeacherCard";
import { getTeachers } from "../../services/firebase";

const TeachersList = ({ filters, visibleCount, onLoadMore }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data);
      setLoading(false);
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

  const handleLoadMore = () => {
    onLoadMore();
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles.container}>
      {filteredTeachers.slice(0, visibleCount).map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          selectedLevel={filters.level}
        />
      ))}

      {loading && <p>Loading...</p>}

      {!loading && visibleCount < filteredTeachers.length && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}

      <div ref={bottomRef} style={{ width: '100%', height: '1px' }} />
    </div>
  );
};

export default TeachersList;