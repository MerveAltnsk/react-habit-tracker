function HabitItem({ habit, handleToggleHabit, handleDeleteHabit }) {
  return (
    <li className="habit-item">
      <input
        type="checkbox"
        checked={habit.completed}
        onChange={() => handleToggleHabit(habit)}
        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
      />

      <span
        style={{
          textDecoration: habit.completed ? "line-through" : "none",
          marginLeft: "10px",
          color: habit.completed ? "#94a3b8" : "#1e293b",
          flex: 1
        }}
      >
        {habit.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => handleDeleteHabit(habit.id)}
      >
        Sil
      </button>
    </li>
  )
}

export default HabitItem;