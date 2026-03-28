
import { useState } from "react";
import { useData } from "../../Context/DataContext";

export default function UploadRecords() {
  const { uploadRecord } = useData();
  const [recordName, setRecordName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = () => {
    if (!recordName || !department) {
      alert("Please fill record name and department");
      return;
    }
    
    uploadRecord({
      name: recordName,
      department: department,
      description: description
    });

    alert("Record uploaded successfully to blockchain!");
    
    // Reset form
    setRecordName("");
    setDepartment("");
    setDescription("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Upload New Medical Record</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl h-64 flex flex-col items-center justify-center mb-8 cursor-pointer hover:border-emerald-400">
          <p className="text-6xl mb-4">📤</p>
          <p className="font-medium">Drag & drop files here</p>
          <p className="text-sm text-slate-500 mt-1">PDF, JPG, PNG, DICOM supported</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Record Name</label>
            <input
              type="text"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              placeholder="e.g. Blood Test Report"
              className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl focus:outline-none"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Radiology">Radiology</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Additional notes about this record..."
            className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-3xl focus:outline-none resize-none"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-3xl font-semibold text-lg"
        >
          Upload to Blockchain
        </button>
      </div>
    </div>
  );
}