export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Account Settings</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-white text-5xl font-bold">NS</div>
          <div>
            <p className="text-2xl font-semibold">Nitisha Sharma</p>
            <p className="text-slate-500">nitisha.sharma@email.com</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" defaultValue="Nitisha Sharma" className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Change Password</label>
            <input type="password" placeholder="New Password" className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl" />
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-3xl font-medium">Save Changes</button>
        </div>
      </div>
    </div>
  );
}