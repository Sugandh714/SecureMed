
import { useData } from "../../Context/DataContext";

export default function Overview() {
  const { records, requests, logs } = useData();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Welcome back, Nitisha</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 card-hover">
          <p className="text-slate-500 text-sm">Total Records</p>
          <p className="text-5xl font-semibold mt-3">{records.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 card-hover">
          <p className="text-slate-500 text-sm">Active Permissions</p>
          <p className="text-5xl font-semibold mt-3">5</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 card-hover">
          <p className="text-slate-500 text-sm">Pending Requests</p>
          <p className="text-5xl font-semibold mt-3">{requests.filter(r => r.status === "pending").length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 card-hover">
          <p className="text-slate-500 text-sm">Blockchain Logs</p>
          <p className="text-5xl font-semibold mt-3">{logs.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-5">
          {logs.slice(0, 3).map((log, index) => (
            <div key={index} className="flex gap-4">
              <div className="text-emerald-500">⛓️</div>
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-slate-500">{log.detail} • {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}