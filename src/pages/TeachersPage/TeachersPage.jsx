import { useState, useRef } from "react";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import Header from "../../components/Header/Header";
import styles from "./TeachersPage.module.scss";

const TeachersPage = () => {
  const [filters, setFilters] = useState({
    language: "French",
    level: "A1 Beginner",
    price: "30$",
  });

  const [visibleCount, setVisibleCount] = useState(4);
  const bottomRef = useRef(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <Header />
        <Filters onFilterChange={handleFilterChange} />
      </div>

      <div className={styles.contentContainer}>
        <TeachersList
          filters={filters}
          visibleCount={visibleCount}
          onLoadMore={handleLoadMore}
        />
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TeachersPage;
