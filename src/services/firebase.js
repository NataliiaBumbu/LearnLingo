import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";

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

/**
 * 🔹 Додає викладачів у базу
 * @param {Array} teachers - Масив об'єктів викладачів
 */
export const addTeachersToDatabase = async (teachers) => {
  const updates = {};
  teachers.forEach((teacher) => {
    const id = teacher.id || crypto.randomUUID();
    updates[`teachers/${id}`] = { ...teacher, id };
  });

  try {
    await update(ref(db), updates);
    console.log("Teachers added successfully!");
  } catch (error) {
    console.error("Error adding teachers:", error);
  }
};


/**
 * 🔹 Отримує список викладачів із Firebase
 * @returns {Promise<Array>} Масив викладачів
 */
export const getTeachers = async () => {
  try {
    const snapshot = await get(ref(db, "teachers"));
    return snapshot.exists() ? Object.entries(snapshot.val()).map(([id, teacher]) => ({ id, ...teacher })) : [];  } catch (error) {
    console.error("❌ Помилка отримання викладачів:", error);
    return [];
  }
};

/**
 * 🔹 Перемикає стан "обраного" викладача
 * @param {string} userId - ID користувача
 * @param {string} teacherId - ID викладача
 */
export const toggleFavorite = async (userId, teacherId) => {
  try {
    const userRef = ref(db, `users/${userId}/favorites/${teacherId}`);
    const snapshot = await get(userRef);
    await set(userRef, snapshot.exists() ? null : true);
  } catch (error) {
    console.error("❌ Помилка зміни статусу улюбленого викладача:", error);
  }
};

/**
 * 🔹 Перевіряє, чи викладач у списку "обраних"
 * @param {string} userId - ID користувача
 * @param {string} teacherId - ID викладача
 * @returns {Promise<boolean>}
 */
export const isFavorite = async (userId, teacherId) => {
  try {
    const snapshot = await get(ref(db, `users/${userId}/favorites/${teacherId}`));
    return snapshot.exists();
  } catch (error) {
    console.error("❌ Помилка перевірки улюблених викладачів:", error);
    return false;
  }
};

/**
 * 🔹 Отримує список обраних викладачів користувача
 * @returns {Promise<Array>} Масив ID обраних викладачів
 */
export const getFavoriteTeachers = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const snapshot = await get(ref(db, `users/${user.uid}/favorites`));
    return snapshot.exists() ? Object.keys(snapshot.val()) : [];
  } catch (error) {
    console.error("❌ Помилка отримання улюблених викладачів:", error);
    return [];
  }
};
