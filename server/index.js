const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Fake DB (şimdilik)
let habits = [
  { id: 1, text: "Drink Water", completed: false },
  { id: 2, text: "Take a Walk", completed: true }
];

// GET - tüm habitler
app.get("/habits", (req, res) => {
  res.json(habits);
});

// POST - yeni habit
app.post("/habits", (req, res) => {
  const newHabit = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
});

// PATCH - toggle
app.patch("/habits/:id", (req, res) => {
  const id = Number(req.params.id);

  habits = habits.map(h =>
    h.id === id ? { ...h, ...req.body } : h
  );

  const updated = habits.find(h => h.id === id);
  res.json(updated);
});

// DELETE
app.delete("/habits/:id", (req, res) => {
  const id = Number(req.params.id);
  habits = habits.filter(h => h.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});
