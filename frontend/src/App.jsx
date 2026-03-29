import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { DataProvider } from "./Context/DataContext";

// Layout Components (Patient)
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Patient Pages
import Overview from "./pages/Patient/Overview";
import UploadRecords from "./pages/Patient/UploadRecords";
import AccessRequests from "./pages/Patient/AccessRequests";
import MyRecords from "./pages/Patient/MyRecords";
import BlockchainLogs from "./pages/Patient/BlockchainLogs";
import Settings from "./pages/Patient/Settings";

// Admin Layout + Pages
import Admin from "./pages/Admin/Admin";

// Auth + Home
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DoctorDashboard from "./pages/Doctor/Doctor";

// ✅ Patient Layout
function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// ✅ App
function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Routes>

          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="upload" element={<UploadRecords />} />
            <Route path="requests" element={<AccessRequests />} />
            <Route path="records" element={<MyRecords />} />
            <Route path="logs" element={<BlockchainLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
           <Route path="/doctor" element={<DoctorDashboard />} />
          {/* Admin Dashboard */}
          <Route path="/admin" element={<Admin />}>
            
          </Route>
        
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;