import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import Container from '../components/Container';
import JobForm from '../components/JobForm';


export default function JobDetails() {
const { id } = useParams();
const { jobs, updateJob, removeJob } = useJobs();
const navigate = useNavigate();
const job = jobs.find((j) => j.id === id);


if (!job) return <Container><div className="p-6 bg-gray-50 rounded">Job not found.</div></Container>;


function handleEdit(patch) {
updateJob(id, patch);
}


function handleDelete() {
if (!confirm('Delete this job?')) return;
removeJob(id);
navigate('/');
}


return (
<Container>
<div className="flex items-center justify-between mb-3">
<h1 className="text-2xl font-semibold">{job.company} — {job.title}</h1>
<div className="text-sm text-gray-600">{job.status}</div>
</div>


<div className="mb-4 bg-white p-4 rounded shadow">
<div className="text-sm text-gray-500">Applied: {job.date}</div>
<div className="mt-3 whitespace-pre-wrap">{job.notes || <em className="text-gray-400">No notes</em>}</div>
</div>


<h2 className="text-lg font-medium mb-2">Edit</h2>
<JobForm initial={job} onSave={(data) => { handleEdit(data); alert('Saved'); }} />


<div className="mt-4">
<button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white rounded">Delete</button>
</div>
</Container>
);
}