import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Patient Dashboard</h1>
      
      <div className="flex items-center gap-x-6">
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-slate-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-2xl flex items-center justify-center">3</span>
        </div>
        
        <div className="flex items-center gap-x-3">
          <div className="text-right">
            <p className="font-semibold text-sm">Nitisha Sharma</p>
            <p className="text-xs text-emerald-600">Verified Patient</p>
          </div>
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold">NS</div>
        </div>
      </div>
    </div>
  );
}