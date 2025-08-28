import { Link } from 'react-router-dom';


export default function Header() {
return (
<header className="bg-white shadow p-4 flex items-center justify-between">
<Link to="/" className="text-xl font-bold">JobTracker</Link>
<nav className="space-x-3">
<Link to="/" className="text-sm">Dashboard</Link>
<Link to="/add" className="text-sm">Add Job</Link>
</nav>
</header>
);
}