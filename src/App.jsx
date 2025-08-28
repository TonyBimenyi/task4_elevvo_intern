import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import { JobsProvider } from './context/JobsContext';


export default function App() {
return (
<Router>
<div className="min-h-screen bg-gray-100">
<Header />
<main className="py-6">
<JobsProvider>
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/add" element={<AddJob />} />
<Route path="/job/:id" element={<JobDetails />} />
</Routes>
</JobsProvider>
</main>
</div>
</Router>
);
}