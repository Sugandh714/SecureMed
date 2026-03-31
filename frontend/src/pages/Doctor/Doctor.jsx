import React, { useState } from 'react';
import { 
  Users, Bell, Clock, AlertTriangle, 
  FileText, Upload, Shield, History, User, LogOut 
} from 'lucide-react';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock Data
  const stats = {
    totalPatients: 47,
    pendingRequests: 8,
    emergencyAlerts: 3,
    recentActivity: 12
  };

  const patients = [
    { id: 1, name: "Aarav Sharma", age: 45, gender: "Male", condition: "Hypertension", status: "Stable" },
    { id: 2, name: "Priya Patel", age: 32, gender: "Female", condition: "Diabetes Type 2", status: "Critical" },
    { id: 3, name: "Rohan Mehra", age: 67, gender: "Male", condition: "Post Cardiac Surgery", status: "Recovering" },
    { id: 4, name: "Ananya Gupta", age: 28, gender: "Female", condition: "Migraine", status: "Stable" },
  ];

  const recentActivity = [
    { time: "10 min ago", action: "Viewed MRI report of Priya Patel" },
    { time: "2 hours ago", action: "Requested access to Aarav Sharma's blood reports" },
    { time: "Yesterday", action: "Uploaded prescription for Rohan Mehra" },
  ];

  const accessRequests = [
    { id: "REC-8923", patient: "Aarav Sharma", reason: "Follow-up consultation", status: "Pending" },
    { id: "REC-8921", patient: "Priya Patel", reason: "Emergency blood sugar monitoring", status: "Approved" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🩺</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SecureMed</h1>
              <p className="text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Users },
              { id: 'patients', label: 'My Patients', icon: Users },
              { id: 'records', label: 'Medical Records', icon: FileText },
              { id: 'requests', label: 'Access Requests', icon: Shield },
              { id: 'upload', label: 'Upload Records', icon: Upload },
              { id: 'emergency', label: 'Emergency Access', icon: AlertTriangle },
              { id: 'logs', label: 'Activity Logs', icon: History },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              DS
            </div>
            <div className="flex-1">
              <p className="font-medium">Dr. Dev Sharma</p>
              <p className="text-xs text-gray-500">Cardiologist • Max Hospital</p>
            </div>
            <LogOut className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 capitalize">
              {activeTab === 'dashboard' ? 'Overview' : 
               activeTab === 'patients' ? 'My Patients' : 
               activeTab === 'records' ? 'Medical Records' : activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium">Sunday, 29 Mar 2026</p>
              <p className="text-gray-500 text-xs">10:03 PM IST</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Total Patients</p>
                      <p className="text-4xl font-bold mt-2">{stats.totalPatients}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Pending Requests</p>
                      <p className="text-4xl font-bold mt-2 text-amber-600">{stats.pendingRequests}</p>
                    </div>
                    <Clock className="w-10 h-10 text-amber-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-red-100 bg-red-50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-red-600 text-sm">Emergency Alerts</p>
                      <p className="text-4xl font-bold mt-2 text-red-600">{stats.emergencyAlerts}</p>
                    </div>
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Recent Activity</p>
                      <p className="text-4xl font-bold mt-2">{stats.recentActivity}</p>
                    </div>
                    <History className="w-10 h-10 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Patients */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Recent Patient Updates
                  </h3>
                  <div className="space-y-4">
                    {patients.slice(0, 3).map(patient => (
                      <div 
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
                            👤
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.age} • {patient.gender}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">{patient.condition}</p>
                          <p className={`text-xs px-3 py-1 rounded-full inline-block mt-1 ${
                            patient.status === 'Critical' ? 'bg-red-100 text-red-700' : 
                            patient.status === 'Recovering' ? 'bg-blue-100 text-blue-700' : 
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {patient.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" /> Notifications
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-2xl text-sm">
                        <p className="text-gray-600">{act.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Patients Tab */}
          {activeTab === 'patients' && (
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-semibold text-xl">My Patients</h3>
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  className="border border-gray-300 rounded-full px-5 py-2.5 text-sm w-80 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-6 font-medium text-gray-600">Patient Name</th>
                      <th className="text-left p-6 font-medium text-gray-600">Age / Gender</th>
                      <th className="text-left p-6 font-medium text-gray-600">Condition</th>
                      <th className="text-left p-6 font-medium text-gray-600">Status</th>
                      <th className="text-right p-6 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-gray-50">
                        <td className="p-6 font-medium">{patient.name}</td>
                        <td className="p-6 text-gray-600">{patient.age} • {patient.gender}</td>
                        <td className="p-6 text-gray-600">{patient.condition}</td>
                        <td className="p-6">
                          <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                            patient.status === 'Critical' ? 'bg-red-100 text-red-700' : 
                            patient.status === 'Recovering' ? 'bg-blue-100 text-blue-700' : 
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => setSelectedPatient(patient)}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition-all"
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Patient Details Modal */}
          {selectedPatient && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                <div className="p-8 border-b flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-gray-500">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-8 space-y-8 overflow-auto max-h-[70vh]">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-700">Current Condition</h4>
                    <p className="text-lg">{selectedPatient.condition}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-1">Consent Status</p>
                      <p className="text-emerald-600 font-medium">Partial Access Granted</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-1">Last Access</p>
                      <p className="font-medium">2 days ago</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Assigned Records</h4>
                    <div className="space-y-3">
                      {["Blood Report - 12 Mar 2026", "ECG Report - 10 Mar 2026", "Prescription - 8 Mar 2026"].map((rec, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span>{rec}</span>
                          </div>
                          <button className="text-blue-600 hover:underline text-sm">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t p-6 flex gap-4">
                  <button className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium transition-all">Request Full Access</button>
                  <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all">View All Records</button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder (you can expand similarly) */}
          {(activeTab === 'records' || activeTab === 'requests' || activeTab === 'upload' || 
            activeTab === 'emergency' || activeTab === 'logs') && (
            <div className="bg-white rounded-3xl p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                {activeTab === 'emergency' ? <AlertTriangle className="w-12 h-12 text-red-500" /> : 
                 activeTab === 'upload' ? <Upload className="w-12 h-12 text-blue-500" /> : 
                 <Shield className="w-12 h-12 text-gray-400" />}
              </div>
              <h3 className="text-2xl font-semibold mb-3 capitalize">{activeTab.replace('-', ' ')}</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This section is ready for implementation. 
                {activeTab === 'emergency' && " Emergency access is time-bound and heavily logged."}
                {activeTab === 'upload' && " All uploads are encrypted and linked to blockchain."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;