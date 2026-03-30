import React, { useState } from 'react';
import { ShieldCheck, User, Stethoscope, UserCog, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState('patient'); // patient, doctor, admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

if (res.ok) {
  alert("Login successful");
  console.log(data);

  // Store user (optional but recommended)
  localStorage.setItem("user", JSON.stringify(data));

  // 🔥 Role-based redirect
  if (role === "patient") {
    navigate("/dashboard");
  } else if (role === "doctor") {
    navigate("/doctor");
  } else if (role === "admin") {
    navigate("/admin");
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-800 to-sky-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">SecureMed</h1>
          </div>
          <p className="text-teal-100 text-lg">Patient-Controlled Medical Records</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-8">Sign in to access your dashboard</p>

            {/* Role Selector */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
              <button
                onClick={() => handleRoleChange('patient')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2
                  ${role === 'patient' ? 'bg-white shadow text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="w-4 h-4" />
                Patient
              </button>
              <button
                onClick={() => handleRoleChange('doctor')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2
                  ${role === 'doctor' ? 'bg-white shadow text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Stethoscope className="w-4 h-4" />
                Doctor
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2
                  ${role === 'admin' ? 'bg-white shadow text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <UserCog className="w-4 h-4" />
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email / Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                  placeholder="Enter your email or username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-teal-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-teal-600 hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Register Link */}
          <div className="border-t border-gray-100 px-8 py-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-teal-600 font-semibold hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-teal-100 text-sm mt-6">
          Secure • Transparent • Patient-Controlled
        </p>
      </div>
    </div>
  );
};

export default Login;