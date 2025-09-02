import { useJobs } from "../context/JobsContext";
import { Upload, Download } from "lucide-react"; // icons

export default function ImportExport() {
  const { jobs, replaceAll } = useJobs();

  function exportJSON() {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job-applications.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error("Invalid file");
        replaceAll(parsed);
        alert("Imported successfully");
      } catch (err) {
        alert("Failed to import: " + err.message);
      }
    };
    reader.readAsText(f);
  }

  return (
    <div className="flex items-center gap-3">
      {/* Export */}
      <button
        onClick={exportJSON}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-100 transition"
      >
        <Upload size={16} className="text-gray-600" />
        Export
      </button>

      {/* Import */}
      <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-100 cursor-pointer transition">
        <Download size={16} className="text-gray-600" />
        Import
        <input
          type="file"
          accept="application/json"
          onChange={handleFile}
          className="hidden"
        />
      </label>
    </div>
  );
}
