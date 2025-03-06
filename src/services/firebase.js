import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

// 🔹 Firebase конфігурація
const firebaseConfig = {
  apiKey: "AIzaSyCxPfvb-4sRst0qGBJ10QNX7rl4hDV-kas",
  authDomain: "learnlingo-7da97.firebaseapp.com",
  projectId: "learnlingo-7da97",
  storageBucket: "learnlingo-7da97.appspot.com",
  messagingSenderId: "1047555671913",
  appId: "1:1047555671913:web:8360c4de6914f3ad2a9ff8",
  measurementId: "G-7J1X7KSK58",
  databaseURL: "https://learnlingo-7da97-default-rtdb.firebaseio.com/",
};

// 🔹 Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// 🔹 Функція для додавання викладачів у базу
export const addTeachersToDatabase = async (teachers) => {
  try {
    await set(ref(db, "teachers"), teachers);
    console.log("Teachers added successfully!");
  } catch (error) {
    console.error("Error adding teachers:", error);
  }
};

// 🔹 Функція для отримання викладачів із бази
export const getTeachersFromDatabase = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "teachers"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No teachers found in database.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }
};
