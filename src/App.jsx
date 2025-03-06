import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import { addTeachersToDatabase, getTeachersFromDatabase } from "./services/firebase";

function App() {
  useEffect(() => {
    addTeachersToDatabase();
    getTeachersFromDatabase();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
     
    </Routes>
  );
}

export default App;
