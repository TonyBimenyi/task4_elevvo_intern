import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import Container from '../components/Container';
import ImportExport from '../components/ImportExport';
import { Briefcase, MessageSquare, Award, XCircle } from 'lucide-react';

export default function Dashboard() {
  const { jobs } = useJobs();

  // Count jobs by status
  const applied = jobs.filter(job => job.status === "Applied").length;
  const interviewing = jobs.filter(job => job.status === "Interviewing").length;
  const offer = jobs.filter(job => job.status === "Offer").length;
  const rejected = jobs.filter(job => job.status === "Rejected").length;

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <ImportExport />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold">{applied}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Applied</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold">{interviewing}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Interviewing</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold">{offer}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Offers</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold">{rejected}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Job List */}
      {jobs.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded">
          No jobs yet — click "Add Job" to start tracking.
        </div>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-white shadow-sm rounded flex items-center justify-between"
            >
              <div>
                <Link to={`/job/${job.id}`} className="text-lg font-medium">
                  {job.company} — {job.title}
                </Link>
                <div className="text-sm text-gray-500">
                  {job.status} • Applied: {job.date}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {job.notes ? '📝' : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
