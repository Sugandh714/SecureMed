import { useState } from "react";

export default function UploadRecords() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !type) return alert("All fields are required");

    setUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/records/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadResult(data.data);
        alert("✅ File uploaded successfully to IPFS!");
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-semibold mb-8">Upload Medical Record</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Select File (PDF, JPG, PNG)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-slate-300 dark:border-slate-600 rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Record Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. MRI Brain Scan"
            className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Department / Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl"
          >
            <option value="">Select Type</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Radiology">Radiology</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-3xl font-semibold text-lg disabled:bg-gray-400"
        >
          {uploading ? "Uploading to IPFS..." : "Upload File"}
        </button>
      </form>

      {/* Show Result After Upload */}
      {uploadResult && (
        <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl">
          <h3 className="font-semibold text-emerald-700 mb-3">✅ Upload Successful!</h3>
          <p><strong>Title:</strong> {uploadResult.title}</p>
          <p><strong>File:</strong> {uploadResult.fileName}</p>
          <p className="mt-4">
            <strong>IPFS Link:</strong><br />
            <a
              href={uploadResult.ipfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {uploadResult.ipfsUrl}
            </a>
          </p>
          <p className="text-xs text-slate-500 mt-2">CID: {uploadResult.ipfsCid}</p>
        </div>
      )}
    </div>
  );
}