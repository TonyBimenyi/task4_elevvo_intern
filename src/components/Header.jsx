import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between">
      {/* Left side */}
      <Link to="/" className="text-xl font-bold">
        Dashboard Overview
      </Link>

      {/* Right side */}
      <nav className="flex items-center space-x-4">
        <Link to="/add" className="text-sm">
          Add Job
        </Link>
      </nav>
    </header>
  );
}
