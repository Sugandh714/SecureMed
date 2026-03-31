import { NavLink } from "react-router-dom";
import { Home, Upload, Handshake, FolderOpen, Link2, Settings } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/dashboard/upload", label: "Upload Records", icon: Upload },
  { to: "/dashboard/requests", label: "Access Requests", icon: Handshake },
  { to: "/dashboard/records", label: "My Records", icon: FolderOpen },
  { to: "/dashboard/logs", label: "Blockchain Logs", icon: Link2 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { toggleTheme } = useTheme();

  return (
    <div className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-xl">
      {/* Logo */}
      <div className="px-8 py-6 border-b flex items-center gap-x-3">
        <div className="w-9 h-9 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
          <span className="text-xl">🛡️</span>
        </div>
        <div className="text-3xl font-semibold tracking-tighter text-slate-900 dark:text-white">SecureMed</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-x-3.5 px-5 py-4 text-[15px] font-medium rounded-3xl transition-all sidebar-link ${
                isActive 
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30" 
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-x-3 bg-slate-50 dark:bg-slate-800 rounded-3xl p-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-semibold">NS</div>
          <div className="flex-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200">Nitisha Sharma</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Delhi, India</p>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-2xl"
          >
            🌙
          </button>
        </div>
      </div>
    </div>
  );
}