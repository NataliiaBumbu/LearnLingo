import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import './App.scss';
import { addTeachersToDatabase, getTeachers } from "./services/firebase";
import teachers from "./data/teachers.json";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    addTeachersToDatabase(teachers);
    getTeachers();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
