import React, { useState } from "react";

export default function JobForm({ initial = null, onSave }) {
  const [company, setCompany] = useState(initial?.company ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [status, setStatus] = useState(initial?.status ?? "Applied");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");

  function submit(e) {
    e.preventDefault();
    if (!company.trim() || !title.trim())
      return alert("Company and title are required");
    onSave({ company: company.trim(), title: title.trim(), status, date, notes });
  }

  return (
    <form
      onSubmit={submit}
      className=" bg-white w-full p-6 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        {initial ? "Edit Job Application" : "New Job Application"}
      </h2>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border shadow bg-transparent rounded-lg p-2.5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter company name"
            />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full shadow bg-transparent border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter job title"
        />
      </div>

      {/* Status + Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full shadow bg-transparent border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full shadow bg-transparent border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full shadow bg-transparent border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none h-28"
          placeholder="Additional details..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3 border-t">
        <button
          type="button"
          className="px-4 py-2  rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          onClick={() => {
            setCompany("");
            setTitle("");
            setStatus("Applied");
            setDate(new Date().toISOString().slice(0, 10));
            setNotes("");
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
