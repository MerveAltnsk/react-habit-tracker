// services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3001/habits";

/* =======================
   GET - tüm habitler
======================= */
export const getHabits = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data || err.message);
  }
};

/* =======================
   POST - yeni habit
======================= */
export const createHabit = async (habit) => {
  try {
    const res = await axios.post(BASE_URL, habit);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data || err.message);
  }
};

/* =======================
   DELETE - habit sil
======================= */
export const deleteHabitById = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    throw new Error(err.response?.data || err.message);
  }
};

/* =======================
   PATCH - toggle / update
======================= */
export const updateHabit = async (id, updatedFields) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}`, updatedFields);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data || err.message);
  }
};



// AUTH
export const registerUser = (user) => axios.post(`${API_URL}/auth/register`, user);
export const loginUser = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
