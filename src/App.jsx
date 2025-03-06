import { Route, Routes } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import { addTeachersToDatabase, getTeachersFromDatabase } from "./services/firebase";
import { useEffect } from "react";
import teachers from "./data/teachers.json";

const addTeachersToDatabase = async () => {
  try {
    await set(ref(database, "teachers"), teachers);
    console.log("Teachers added successfully!");
  } catch (error) {
    console.error("Error adding teachers:", error);
  }
};

const getTeachersFromDatabase = async () => {
  try {
    const snapshot = await get(ref(database, "teachers"));
    if (snapshot.exists()) {
      console.log("Teachers from DB:", snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }
};

function App() {
  useEffect(() => {
    addTeachersToDatabase();
    getTeachersFromDatabase();
  }, []);



  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/teachers" element={<TeachersPage />} />
    </Routes>
      

  )
}

export default App