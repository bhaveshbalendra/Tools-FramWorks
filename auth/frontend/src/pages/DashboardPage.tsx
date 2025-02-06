import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex flex-row gap-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/Profile">Profile</Link>
      </div>
    </div>
  );
}
