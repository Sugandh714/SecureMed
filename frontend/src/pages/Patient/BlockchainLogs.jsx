
import { useData } from "../../Context/DataContext";

export default function BlockchainLogs() {
  const { logs } = useData();

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
        ⛓️ Blockchain Logs
      </h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 space-y-8">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-6 border-b last:border-none pb-6 last:pb-0">
            <div className="text-xs text-slate-400 w-40 shrink-0">{log.time}</div>
            <div className="flex-1">
              <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-3xl mb-2">{log.action}</span>
              <p className="font-medium">{log.actor}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{log.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}