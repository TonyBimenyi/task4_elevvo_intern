import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import Container from '../components/Container';
import JobForm from '../components/JobForm';


export default function AddJob() {
const { addJob } = useJobs();
const navigate = useNavigate();


function handleSave(job) {
addJob(job);
navigate('/');
}


return (
<Container>
{/* <h1 className="text-2xl font-semibold mb-3">Add Job</h1> */}
<JobForm onSave={handleSave} />
</Container>
);
}