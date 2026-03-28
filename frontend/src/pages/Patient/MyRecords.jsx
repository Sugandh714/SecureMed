
import { useData } from "../../Context/DataContext";

export default function MyRecords() {
  const { records } = useData();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">My Records</h2>
        <button 
          onClick={() => window.location.href = "/dashboard/upload"}
          className="bg-emerald-500 text-white px-8 py-3 rounded-3xl flex items-center gap-2"
        >
          + New Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div key={record.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 card-hover">
            <div className="flex justify-between mb-4">
              <span className="px-4 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-3xl">{record.department}</span>
              <span className="text-xs text-slate-500">{record.date}</span>
            </div>
            <h3 className="font-semibold text-lg mb-6">{record.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-xs px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-3xl">{record.status}</span>
              <div className="flex gap-4 text-slate-400">
                <button className="hover:text-slate-600">👁️</button>
                <button className="hover:text-slate-600">↓</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}