import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between">
      {/* Left side */}
      <Link to="/" className="text-3xl font-bold">
        Job Tracker App
      </Link>

      {/* Right side */}
      <nav className="flex items-center space-x-4">
      <Link to="/add">
        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-sm shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition">
            + Add Job
        </button>
    </Link>

      </nav>
    </header>
  );
}
