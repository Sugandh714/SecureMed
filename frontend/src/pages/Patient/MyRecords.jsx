import { useState, useEffect } from "react";
import { getRecords, deleteRecord } from "../../services/api";

export default function MyRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords().then(res => setRecords(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      await deleteRecord(id);
      setRecords(records.filter(r => r._id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {records.map(record => (
        <div key={record._id} className="bg-white dark:bg-slate-800 rounded-3xl p-6">
          <h3 className="font-semibold">{record.title}</h3>
          <p className="text-sm text-slate-500">{record.type} • {new Date(record.uploadedAt).toLocaleDateString()}</p>
          <button onClick={() => handleDelete(record._id)} className="text-red-500 mt-4">Delete</button>
        </div>
      ))}
    </div>
  );
}