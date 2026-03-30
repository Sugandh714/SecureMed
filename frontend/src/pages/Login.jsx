import React, { useState } from 'react';
import { ShieldCheck, User, Stethoscope, UserCog, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful");

        // store user
        localStorage.setItem("user", JSON.stringify(data));

        // 🔥 role-based redirect (use backend role if available)
        const userRole = data.role || role;

        if (userRole === "patient") {
          navigate("/dashboard");
        } else if (userRole === "doctor") {
          navigate("/doctor");
        } else if (userRole === "admin") {
          navigate("/admin");
        }

      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-800 to-sky-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">SecureMed</h1>
          </div>
          <p className="text-teal-100">Patient-Controlled Medical Records</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-semibold text-center mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-8">Sign in to access your dashboard</p>

            {/* Role Selector */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                  role === 'patient' ? 'bg-white shadow text-teal-700' : 'text-gray-600'
                }`}
              >
                <User size={16} /> Patient
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('doctor')}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                  role === 'doctor' ? 'bg-white shadow text-teal-700' : 'text-gray-600'
                }`}
              >
                <Stethoscope size={16} /> Doctor
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                  role === 'admin' ? 'bg-white shadow text-teal-700' : 'text-gray-600'
                }`}
              >
                <UserCog size={16} /> Admin
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">

              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 border rounded-2xl"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 border rounded-2xl pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-4 rounded-2xl"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-6 text-center">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-teal-600 font-semibold">
                Create Account
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;