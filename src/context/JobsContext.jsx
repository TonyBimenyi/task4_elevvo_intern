import React, { useState, useEffect, createContext, useContext } from 'react';


const JobsContext = createContext();
export function useJobs() { return useContext(JobsContext); }
const uid = () => Math.random().toString(36).slice(2, 9);


export function JobsProvider({ children }) {
const [jobs, setJobs] = useState(() => {
try {
const raw = localStorage.getItem('jobs_v1');
return raw ? JSON.parse(raw) : [];
} catch {
return [];
}
});


useEffect(() => {
localStorage.setItem('jobs_v1', JSON.stringify(jobs));
}, [jobs]);


const addJob = (job) => setJobs((s) => [{ ...job, id: uid() }, ...s]);
const updateJob = (id, patch) => setJobs((s) => s.map((j) => (j.id === id ? { ...j, ...patch } : j)));
const removeJob = (id) => setJobs((s) => s.filter((j) => j.id !== id));
const replaceAll = (newJobs) => setJobs(newJobs.map((j) => ({ ...j, id: j.id || uid() })));


return (
<JobsContext.Provider value={{ jobs, addJob, updateJob, removeJob, replaceAll }}>
{children}
</JobsContext.Provider>
);
}