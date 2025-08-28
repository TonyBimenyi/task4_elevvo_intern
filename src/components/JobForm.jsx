import React, { useState } from 'react';


export default function JobForm({ initial = null, onSave }) {
const [company, setCompany] = useState(initial?.company ?? '');
const [title, setTitle] = useState(initial?.title ?? '');
const [status, setStatus] = useState(initial?.status ?? 'Applied');
const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
const [notes, setNotes] = useState(initial?.notes ?? '');


function submit(e) {
e.preventDefault();
if (!company.trim() || !title.trim()) return alert('Company and title are required');
onSave({ company: company.trim(), title: title.trim(), status, date, notes });
}


return (
<form onSubmit={submit} className="space-y-3 bg-white p-4 shadow rounded">
<div>
<label className="block text-sm">Company</label>
<input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border rounded p-2" />
</div>
<div>
<label className="block text-sm">Job Title</label>
<input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2" />
</div>
<div className="grid grid-cols-2 gap-2">
<div>
<label className="block text-sm">Status</label>
<select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded p-2">
<option>Applied</option>
<option>Interviewing</option>
<option>Offer</option>
<option>Rejected</option>
</select>
</div>
<div>
<label className="block text-sm">Application Date</label>
<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded p-2" />
</div>
</div>
<div>
<label className="block text-sm">Notes</label>
<textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded p-2 h-24" />
</div>
<div className="flex items-center justify-end">
<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
</div>
</form>
);
}