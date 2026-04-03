// backend/server.js
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import recordRoutes from "./routes/recordRoutes.js";
import { 
  register, 
  login,
  getPendingApplications,
  approveDoctor,
  rejectDoctor 
} from "./controllers/authController.js";


const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: "http://localhost:5173",   // Your Vite frontend
  credentials: true
}));
app.use(express.json());
console.log("ENV CHECK:");
console.log("PINATA_API_KEY:", process.env.PINATA_API_KEY);
console.log("PINATA_SECRET:", process.env.PINATA_SECRET_API_KEY);
app.use("/api/records", recordRoutes);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.log("DB Connection Error ❌");
    console.error(err);
  });

/* ================= ROUTES ================= */

// === Auth Routes ===
app.post("/api/auth/register", async (req, res) => {
  try {
    await register(req, res);
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err.message });
  }
});
app.post("/api/auth/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});


// === Doctor Application Routes (Admin Only - Original) ===
app.get("/api/auth/applications/pending", getPendingApplications);
app.post("/api/auth/applications/:id/approve", approveDoctor);
app.post("/api/auth/applications/:id/reject", rejectDoctor);

// === Doctor Application Routes (Admin Only) ===
/*app.get("/api/auth/applications/pending", async (req, res) => {
  try {
    await getPendingApplications(req, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
});

app.post("/api/auth/applications/:id/approve", async (req, res) => {
  try {
    await approveDoctor(req, res);
  } catch (err) {
    res.status(500).json({ message: "Approval error", error: err.message });
  }
});

app.post("/api/auth/applications/:id/reject", async (req, res) => {
  try {
    await rejectDoctor(req, res);
  } catch (err) {
    res.status(500).json({ message: "Rejection error", error: err.message });
  }
});*/

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("HealthAdmin API is running...");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});