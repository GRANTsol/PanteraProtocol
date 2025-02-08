import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import CSS for styling

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call logout function
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>🚀 Pantera Protocol</h1>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/audits">Audits</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/transactions">Transactions</Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <img src={user.profilePicture || "https://via.placeholder.com/40"} alt="Profile" />
            <span>{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
