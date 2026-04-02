// backend/server.js
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import mongoose from "mongoose";

import cors from "cors";

// ================= IMPORT ALL CONTROLLERS =================
import {
  register,
  login,
  getPendingApplications,
  approveDoctor,
  rejectDoctor
} from "./controllers/authController.js";

import profileRoutes from "./routes/profileRoutes.js";

// NEW ROUTES (for Patient Features)
import recordRoutes from "./routes/recordRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
//import logRoutes from "./routes/logRoutes.js";



const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
console.log("ENV CHECK:");
console.log("PINATA_API_KEY:", process.env.PINATA_API_KEY);
console.log("PINATA_SECRET:", process.env.PINATA_SECRET_API_KEY);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.log("DB Connection Error ❌");
    console.error(err);
  });

/* ================= ROUTES ================= */

// === Auth Routes (Original) ===
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// === Doctor Application Routes (Admin Only - Original) ===
app.get("/api/auth/applications/pending", getPendingApplications);
app.post("/api/auth/applications/:id/approve", approveDoctor);
app.post("/api/auth/applications/:id/reject", rejectDoctor);

// === Profile Route ===
app.use('/api/profile', profileRoutes);

// === Patient Medical Records Routes ===
app.use("/api/records", recordRoutes);

// === Access Requests Routes ===
app.use("/api/requests", requestRoutes);

// === Blockchain Logs Routes ===
//app.use("/api/logs", logRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("SecureMed API is running...");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SecureMed Server running on port ${PORT}`);
});