import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import Container from '../components/Container';
import ImportExport from '../components/ImportExport';


export default function Dashboard() {
const { jobs } = useJobs();


return (
<Container>
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-semibold">Dashboard</h1>
<ImportExport />
</div>


{jobs.length === 0 ? (
<div className="p-6 bg-gray-50 rounded">No jobs yet — click "Add Job" to start tracking.</div>
) : (
<ul className="space-y-3">
{jobs.map((job) => (
<li key={job.id} className="p-4 bg-white shadow-sm rounded flex items-center justify-between">
<div>
<Link to={`/job/${job.id}`} className="text-lg font-medium">{job.company} — {job.title}</Link>
<div className="text-sm text-gray-500">{job.status} • Applied: {job.date}</div>
</div>
<div className="text-sm text-gray-600">{job.notes ? '📝' : ''}</div>
</li>
))}
</ul>
)}
</Container>
);
}