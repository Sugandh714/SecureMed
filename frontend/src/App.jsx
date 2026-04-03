// src/App.jsx
import { Routes, Route, Outlet } from "react-router-dom";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";        // Keep if you're using it



// Pages
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Patient Pages
import Overview from "./pages/Patient/Overview";
import UploadRecords from "./pages/Patient/UploadRecords";
import AccessRequests from "./pages/Patient/AccessRequests";
import MyRecords from "./pages/Patient/MyRecords";
import BlockchainLogs from "./pages/Patient/BlockchainLogs";
import Settings from "./pages/Patient/Settings";

// Admin & Doctor
import Admin from "./pages/Admin/Admin";
import DoctorDashboard from "./pages/Doctor/Doctor";

// Patient Dashboard Layout (Best from original)
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

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Dashboard - Proper Layout with Sidebar + Navbar */}
          // In App.jsx - Simple version (replace the dashboard part)
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/upload" element={<UploadRecords />} />
          <Route path="/dashboard/requests" element={<AccessRequests />} />
          <Route path="/dashboard/records" element={<MyRecords />} />
          <Route path="/dashboard/logs" element={<BlockchainLogs />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* Doctor Dashboard */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;