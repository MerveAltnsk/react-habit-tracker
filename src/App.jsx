import { useEffect, useState } from "react"
import { Routes, Route, NavLink } from "react-router-dom"
import "./App.css"

import HabitItem from "./components/HabitItem"
import StatsBar from "./components/StatsBar"

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
     FETCH HABITS
  ======================= */
  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("http://localhost:3001/habits")
        if (!res.ok) throw new Error("Data could not be loaded.")
        const data = await res.json()
        setHabits(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHabits()
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
    if (allCompleted) setSkor(prev => prev + 1)
  }, [allCompleted])

  /* =======================
     ACTIONS
  ======================= */
  const addHabit = () => {
    if (yeniInput.trim() === "") return

    const newHabit = { text: yeniInput, completed: false }

    fetch("http://localhost:3001/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHabit),
    })
      .then(res => res.json())
      .then(createdHabit => {
        setHabits([...habits, createdHabit])
        setYeniInput("")
      })
  }

  const toggleHabit = habit => {
    fetch(`http://localhost:3001/habits/${habit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !habit.completed }),
    })
      .then(res => res.json())
      .then(updatedHabit => {
        setHabits(
          habits.map(h => (h.id === updatedHabit.id ? updatedHabit : h))
        )
      })
  }

  const deleteHabit = id => {
    fetch(`http://localhost:3001/habits/${id}`, { method: "DELETE" }).then(
      () => {
        setHabits(habits.filter(h => h.id !== id))
      }
    )
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

      {loading && <p style={{ textAlign: "center" }}>⏳ Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>❌ {error}</p>}

      <div className="container-card">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                {allCompleted && <h3 style={{ color: "green" }}>🎉 Bugün tamamlandı!</h3>}
                <p>Total: {habits.length}</p>
                <p>Completed: {completedCount}</p>
                <p>Remaining: {remainingCount}</p>
                <h3>Points: {points} | Score: {skor}</h3>

                <div className="filter-container">
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("completed")}>Completed</button>
                  <button onClick={() => setFilter("active")}>Others</button>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    value={yeniInput}
                    onChange={e => setYeniInput(e.target.value)}
                    placeholder="New Mission"
                  />
                  <button onClick={addHabit}>Add</button>
                </div>

                <ul>
                  {filteredHabits.map(habit => (
                    <HabitItem
                      key={habit.id}
                      habit={habit}
                      toggleHabit={() => toggleHabit(habit)}
                      deleteHabit={() => deleteHabit(habit.id)}
                    />
                  ))}
                </ul>
              </>
            }
          />

          {/* DASHBOARD */}
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
