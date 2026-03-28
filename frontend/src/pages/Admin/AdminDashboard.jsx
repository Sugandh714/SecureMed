import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const stats = [
    { label: "Total Patients", value: "12,458", change: "+18%" },
    { label: "Active Doctors", value: "3,284", change: "+7%" },
    { label: "Records Uploaded", value: "87,932", change: "+24%" },
    { label: "Access Requests Today", value: "1,247", change: "-3%" },
  ];

  const recentActivity = [
    { id: 1, action: "Access Granted", patient: "Emma Thompson", doctor: "Dr. Michael Chen", record: "Cardiology Report", time: "2 min ago", status: "success" },
    { id: 2, action: "Access Revoked", patient: "James Rodriguez", doctor: "Dr. Sarah Patel", record: "MRI Scan", time: "14 min ago", status: "warning" },
    { id: 3, action: "New Record Uploaded", patient: "Aisha Khan", doctor: "-", record: "Blood Test Results", time: "47 min ago", status: "info" },
    { id: 4, action: "Policy Updated", patient: "Robert Kim", doctor: "-", record: "Access Policy", time: "1 hour ago", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl">
            🛡️
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight">MediGuard</div>
            <div className="text-xs text-emerald-400 font-medium">ADMIN PANEL</div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'Users & Roles', icon: '👥' },
            { id: 'records', label: 'Records Monitor', icon: '📋' },
            { id: 'requests', label: 'Access Requests', icon: '🔑' },
            { id: 'blockchain', label: 'Blockchain Log', icon: '⛓️' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-left transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-lg">👨‍💼</div>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-slate-500">System Administrator</div>
            </div>
          </div>
          <button className="mt-6 w-full py-3 text-sm font-medium border border-slate-700 hover:bg-slate-800 rounded-2xl transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">Real-time system overview • March 28, 2026</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-700 px-5 py-2 rounded-3xl text-sm flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              System Healthy
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-3xl text-sm font-medium transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <div className="text-slate-400 text-sm">{stat.label}</div>
              <div className="text-4xl font-semibold mt-3 mb-1">{stat.value}</div>
              <div className={`text-sm ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-orange-400'}`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-emerald-400 text-sm hover:underline">View all logs →</button>
            </div>

            <div className="space-y-5">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-none">
                  <div className="flex items-start gap-5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0
                      ${activity.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                        activity.status === 'warning' ? 'bg-orange-500/20 text-orange-400' : 
                        'bg-blue-500/20 text-blue-400'}`}>
                      {activity.action.includes('Granted') ? '✅' : 
                       activity.action.includes('Revoked') ? '⛔' : '📤'}
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-slate-400">
                        {activity.patient} • {activity.record}
                        {activity.doctor !== '-' && ` → ${activity.doctor}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h3 className="font-semibold mb-6">System Status</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span>Blockchain Sync</span>
                  <span className="text-emerald-400 text-sm font-medium">Healthy • 12s ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>IPFS Nodes</span>
                  <span className="text-emerald-400 text-sm font-medium">142 online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CP-ABE Policy Engine</span>
                  <span className="text-emerald-400 text-sm font-medium">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Proxy Re-Encryption Service</span>
                  <span className="text-emerald-400 text-sm font-medium">Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h3 className="font-semibold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-slate-800 hover:bg-slate-700 transition-colors h-28 rounded-3xl flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">👥</span>
                  <span className="text-sm font-medium">Manage Users</span>
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 transition-colors h-28 rounded-3xl flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">🔍</span>
                  <span className="text-sm font-medium">Audit Log</span>
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 transition-colors h-28 rounded-3xl flex flex-col items-center justify-center gap-2 col-span-2">
                  <span className="text-3xl">📊</span>
                  <span className="text-sm font-medium">Export Compliance Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;