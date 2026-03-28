
import { useData } from "../../Context/DataContext";

export default function AccessRequests() {
  const { requests, approveRequest, rejectRequest } = useData();

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Access Requests</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-slate-500">
              <th className="px-8 py-5">Doctor</th>
              <th className="px-8 py-5">Department</th>
              <th className="px-8 py-5">Requested Record</th>
              <th className="px-8 py-5">Time</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b last:border-none hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="px-8 py-6 font-medium">{req.doctor}</td>
                <td className="px-8 py-6">{req.department}</td>
                <td className="px-8 py-6">{req.record}</td>
                <td className="px-8 py-6 text-sm text-slate-500">{req.time}</td>
                <td className="px-8 py-6">
                  {req.status === "pending" ? (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => approveRequest(req.id)}
                        className="bg-emerald-500 text-white px-6 py-2 rounded-3xl text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => rejectRequest(req.id)}
                        className="border border-red-300 text-red-600 px-6 py-2 rounded-3xl text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`px-5 py-2 rounded-3xl text-sm ${req.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {req.status === "approved" ? "Approved" : "Rejected"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}