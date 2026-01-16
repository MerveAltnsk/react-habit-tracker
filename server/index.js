// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Fake DB
let users = [
  // { id: 1, username: "merve", email: "merve@example.com", password: "1234" }
];

let habits = [
  // { id: 1, text: "Drink Water", completed: false, userId: 1 }
];

// Basit ID üretici
const generateId = () => Date.now();

// =====================
// AUTH ROUTES
// =====================

// REGISTER
app.post("/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists." });

  const newUser = { id: generateId(), username, email, password };
  users.push(newUser);

  // Şimdilik basit token yerine user ID dönecek
  res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
});

// LOGIN
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ id: user.id, username: user.username, email: user.email });
});

// =====================
// HABIT ROUTES (USER SPECIFIC)
// =====================

// GET - sadece ilgili kullanıcının habitleri
app.get("/habits", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "userId query required" });

  const userHabits = habits.filter(h => h.userId === Number(userId));
  res.json(userHabits);
});

// POST - yeni habit ekle (userId ile)
app.post("/habits", (req, res) => {
  const { text, userId } = req.body;
  if (!text || !userId) return res.status(400).json({ message: "text & userId required" });

  const newHabit = { id: generateId(), text, completed: false, userId: Number(userId) };
  habits.push(newHabit);
  res.status(201).json(newHabit);
});

// PATCH - toggle habit (sadece owner)
app.patch("/habits/:id", (req, res) => {
  const { id } = req.params;
  const { completed, userId } = req.body;

  const habitIndex = habits.findIndex(h => h.id === Number(id) && h.userId === Number(userId));
  if (habitIndex === -1) return res.status(404).json({ message: "Habit not found or unauthorized" });

  habits[habitIndex] = { ...habits[habitIndex], completed };
  res.json(habits[habitIndex]);
});

// DELETE - habit sil (sadece owner)
app.delete("/habits/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const habitIndex = habits.findIndex(h => h.id === Number(id) && h.userId === Number(userId));
  if (habitIndex === -1) return res.status(404).json({ message: "Habit not found or unauthorized" });

  habits.splice(habitIndex, 1);
  res.status(204).end();
});

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});
