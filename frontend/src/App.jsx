import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { DataProvider } from "./Context/DataContext";

// Layout Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Patient Dashboard Pages
import Overview from "./pages/Patient/Overview";
import UploadRecords from "./pages/Patient/UploadRecords";
import AccessRequests from "./pages/Patient/AccessRequests";
import MyRecords from "./pages/Patient/MyRecords";
import BlockchainLogs from "./pages/Patient/BlockchainLogs";
import Settings from "./pages/Patient/Settings";

// Existing Routes
import HomePage from "./pages/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Routes>
            <Route index element={<Overview />} />   {/* 👈 better default */}
            <Route path="upload" element={<UploadRecords />} />
            <Route path="requests" element={<AccessRequests />} />
            <Route path="records" element={<MyRecords />} />
            <Route path="logs" element={<BlockchainLogs />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
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
          {/* Existing Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Dashboard */}
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;