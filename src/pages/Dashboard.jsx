import { Link } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import Container from "../components/Container";
import ImportExport from "../components/ImportExport";
import { Briefcase, MessageSquare, Award, XCircle, Search } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function Dashboard() {
  const { jobs } = useJobs();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Count jobs by status
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interviewing = jobs.filter((job) => job.status === "Interviewing").length;
  const offer = jobs.filter((job) => job.status === "Offer").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;

  // Chart Data
  const data = [
    { name: "Applied", value: applied },
    { name: "Interviewing", value: interviewing },
    { name: "Offer", value: offer },
    { name: "Rejected", value: rejected },
  ];
  const COLORS = ["#3b82f6", "#facc15", "#22c55e", "#ef4444"];

  // Filtered Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-black font-semibold">Overview</h1>
        <ImportExport />
      </div>

      {/* Overview Section with Chart and Cards Side by Side */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Job Applications Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Chart on the Left */}
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Cards on the Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl text-black font-bold">{applied}</span>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-700">Applied</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-3xl text-black font-bold">{interviewing}</span>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-700">Interviewing</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-3xl text-black font-bold">{offer}</span>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-700">Offers</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-3xl text-black font-bold">{rejected}</span>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-700">Rejected</p>
            </div>
          </div>
        </div>
      </div>

     {/* Search & Filter Controls */}
<div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
  {/* Search Box */}
  <div className="relative w-full sm:w-1/2">
    <input
      type="text"
      placeholder="Search jobs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 text-black shadow border rounded-lg bg-white focus:outline-blue-500 focus:ring-2 focus:ring-blue-500"
    />
    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
  </div>

  {/* Status Filter */}
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="w-full sm:w-40 px-3 py-2 border text-black shadow rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">All</option>
    <option value="Applied">Applied</option>
    <option value="Interviewing">Interviewing</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>


      {/* Job List */}
      <h1 className="text-2xl text-black font-semibold mb-4">Job Application List</h1>
      {filteredJobs.length === 0 ? (
        <div className="p-6 bg-gray-50 text-gray-600 rounded text-center">
          No jobs found — try adjusting search or filters.
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => {
            let badgeColor =
              job.status === "Applied"
                ? "bg-blue-100 text-blue-700"
                : job.status === "Interviewing"
                ? "bg-yellow-100 text-yellow-700"
                : job.status === "Offer"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700";

            return (
              <li
                key={job.id}
                className="p-5 bg-white rounded-xl shadow flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition"
              >
                <div className="flex flex-col">
                  <Link
                    to={`/job/${job.id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {job.company} — {job.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
                    >
                      {job.status}
                    </span>
                    <span>Applied: {job.date}</span>
                  </div>
                </div>

                {job.notes && (
                  <div className="mt-3 sm:mt-0 text-gray-500 text-sm flex items-center gap-1">
                    <span></span>
                    <span className="hidden sm:inline">Has Notes</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
