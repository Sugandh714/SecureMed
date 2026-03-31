// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { 
    type: String, 
    unique: true, 
    sparse: true,           // Allows null/undefined
    trim: true,
    lowercase: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'admin'], 
    required: true 
  },
  medicalId: String,
  specialization: String,
  department: String,
  phone: String,
  experience: String,
  hospital: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;