import { useJobs } from '../context/JobsContext';


export default function ImportExport() {
const { jobs, replaceAll } = useJobs();


function exportJSON() {
const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'job-applications.json';
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
if (!Array.isArray(parsed)) throw new Error('Invalid file');
replaceAll(parsed);
alert('Imported successfully');
} catch (err) {
alert('Failed to import: ' + err.message);
}
};
reader.readAsText(f);
}


return (
<div className="flex items-center gap-2">
<button onClick={exportJSON} className="px-3 py-1 border rounded text-sm">Export</button>
<label className="px-3 py-1 border rounded text-sm cursor-pointer">
Import
<input type="file" accept="application/json" onChange={handleFile} className="hidden" />
</label>
</div>
);
}