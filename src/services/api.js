import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
})

// Tüm görevleri al
export const getHabits = () => api.get("/habits")

// Yeni görev ekle
export const createHabit = (habit) => api.post("/habits", habit)

// Görev sil
export const deleteHabitById = (id) => api.delete(`/habits/${id}`)

// Görev güncelle (toggle)
export const updateHabit = (id, updatedFields) =>
  api.patch(`/habits/${id}`, updatedFields)

export default api
