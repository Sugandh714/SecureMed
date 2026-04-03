import { useState, useEffect } from "react";
import { getRequests, updateRequestStatus } from "../../services/api";

export default function AccessRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests().then(res => setRequests(res.data));
  }, []);

  const handleStatus = async (id, status) => {
    await updateRequestStatus(id, status);
    setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden">
      <table className="w-full">
        {/* Your existing table */}
        {/* In the Action column use: */}
        <button onClick={() => handleStatus(req._id, "approved")} className="bg-emerald-500 text-white px-6 py-2 rounded-3xl">Approve</button>
        <button onClick={() => handleStatus(req._id, "rejected")} className="border px-6 py-2 rounded-3xl">Reject</button>
      </table>
    </div>
  );
}