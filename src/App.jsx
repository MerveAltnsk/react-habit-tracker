import { useEffect, useState } from "react"
import { Routes, Route, NavLink } from "react-router-dom"
import "./App.css"

import HabitItem from "./components/HabitItem"
import StatsBar from "./components/StatsBar"

import {
  getHabits,
  createHabit,
  deleteHabitById,
  updateHabit
} from "./services/api"

function App() {
  const [yeniInput, setYeniInput] = useState("")
  const [habits, setHabits] = useState([])
  const [filter, setFilter] = useState("all")

  const [points, setPoints] = useState(0)
  const [skor, setSkor] = useState(0)
  const [allCompleted, setAllCompleted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /* =======================
     DATA FETCH
  ======================= */
  useEffect(() => {
    setLoading(true)
    setError(null)

    getHabits()
      .then(res => {
        setHabits(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Data could not be loaded.")
        setLoading(false)
      })
  }, [])

  /* =======================
     POINTS
  ======================= */
  useEffect(() => {
    const completed = habits.filter(h => h.completed).length
    setPoints(completed)
  }, [habits])

  /* =======================
     ALL COMPLETED
  ======================= */
  useEffect(() => {
    if (habits.length > 0 && habits.every(h => h.completed)) {
      setAllCompleted(true)
    } else {
      setAllCompleted(false)
    }
  }, [habits])

  /* =======================
     STREAK (SKOR)
  ======================= */
  useEffect(() => {
    if (habits.length > 0 && habits.every(h => h.completed)) {
      setSkor(prev => prev + 1)
    }
  }, [allCompleted])

  /* =======================
     ACTIONS
  ======================= */
  function addHabit() {
    if (yeniInput.trim() === "") return

    const newHabit = {
      text: yeniInput,
      completed: false
    }

    createHabit(newHabit).then(res => {
      setHabits([...habits, res.data])
      setYeniInput("")
    })
  }

  function deleteHabit(id) {
    deleteHabitById(id).then(() => {
      setHabits(habits.filter(h => h.id !== id))
    })
  }

  function toggleHabit(habit) {
    updateHabit(habit.id, { completed: !habit.completed }).then(res => {
      setHabits(
        habits.map(h =>
          h.id === res.data.id ? res.data : h
        )
      )
    })
  }

  /* =======================
     FILTER
  ======================= */
  const filteredHabits = habits.filter(habit => {
    if (filter === "completed") return habit.completed
    if (filter === "active") return !habit.completed
    return true
  })

  const completedCount = habits.filter(h => h.completed).length
  const remainingCount = habits.length - completedCount

  /* =======================
     UI
  ======================= */
  return (
    <>
      {/* NAV */}
      <nav style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 30 }}>
        <NavLink to="/">Missions</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

    <div className="container-card">

    
      <Routes>
        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <>
              {allCompleted && <h3 style={{ color: "green" }}>🎉 Bugün tamamlandı!</h3>}

              <p>Total: {habits.length}</p>
              <p>Completed: {completedCount}</p>
              <p>Remaining: {remainingCount}</p>

              <h3>Points: {points}</h3>
              <h3>Score: {skor}</h3>

              {/* FILTER BUTTONS */}
              <div className="filter-container">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("active")}>Others</button>
              </div>

              {/* INPUT */}
              <div className="input-group">
                <input
                  type="text"
                  value={yeniInput}
                  onChange={e => setYeniInput(e.target.value)}
                  placeholder="New Mission"
                />
                <button onClick={addHabit}>Add</button>
              </div>

              {/* LIST */}
              <ul>
                {filteredHabits.map(habit => (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    toggleHabit={toggleHabit}
                    deleteHabit={deleteHabit}
                  />
                ))}
              </ul>
            </>
          }
        />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <div style={{ padding: 20, textAlign: "center" }}>
              <h2>Statistics 📊</h2>
              <StatsBar
                total={habits.length}
                completed={completedCount}
                remaining={remainingCount}
                skor={skor}
              />
            </div>
          }
        />
      </Routes>
      </div>
    </>
  )
}

export default App
