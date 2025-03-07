import { useState } from "react";

import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";

const TeachersPage = () => {
  const [filters, setFilters] = useState({
    language: "French",
    level: "A1 Beginner",
    price: "30$",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <TeachersList filters={filters} />
    </div>
  );
};

export default TeachersPage;
