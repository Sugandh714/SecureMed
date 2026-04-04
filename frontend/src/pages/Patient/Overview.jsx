import { useState, useEffect } from "react";
import { getRecords, getRequests, getLogs, getProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({ records: 0, requests: 0, logs: 0 });
  const [userName, setUserName] = useState("");
  // , getLogs()

  useEffect(() => {
  Promise.all([getRecords(), getRequests(), getProfile()])
    .then(([rec, req, profile]) => {

      const recordsData = rec?.data || [];
      const requestsData = req?.data || [];

      setStats({
        records: recordsData.length,
        requests: requestsData.length,
        logs: 0,
      });

      setUserName(profile?.data?.name || "User");

    })
    .catch(err => console.error("Error fetching data:", err));
}, []);

  const menuItems = [
    { label: "Upload Records", path: "/dashboard/upload", icon: "📤" },
    { label: "Access Requests", path: "/dashboard/requests", icon: "🔑" },
    { label: "My Records", path: "/dashboard/records", icon: "📁" },
    { label: "Blockchain Logs", path: "/dashboard/logs", icon: "⛓️" },
    { label: "Settings", path: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">

      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-10 bg-white dark:bg-slate-800 rounded-3xl px-8 py-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl">
            🛡️
          </div>
          <div>
            <h1 className="text-2xl font-semibold">MedVault</h1>
            <p className="text-sm text-slate-500">Patient Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-semibold">{userName}</p>
            <p className="text-xs text-emerald-600">Verified Patient</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            NS
          </div>
        </div>
      </div>

      {/* Welcome + Stats */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">Welcome back, {userName.split(" ")[0]}</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's what's happening with your health records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
          <p className="text-slate-500 text-sm">Total Records</p>
          <p className="text-6xl font-semibold mt-4">{stats.records}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
          <p className="text-slate-500 text-sm">Pending Requests</p>
          <p className="text-6xl font-semibold mt-4 text-amber-600">{stats.requests}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
          <p className="text-slate-500 text-sm">Blockchain Logs</p>
          <p className="text-6xl font-semibold mt-4">{stats.logs}</p>
        </div>
      </div>

      {/* Quick Navigation Menu */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 
                         border border-transparent hover:border-emerald-200 rounded-3xl p-6 cursor-pointer 
                         transition-all duration-200 flex items-center gap-4 group"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <p className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">
                  {item.label}
                </p>
                <p className="text-sm text-slate-500">Go to section →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-slate-400">
        SecureMed • All records are encrypted and stored securely
      </div>
    </div>
  );
}