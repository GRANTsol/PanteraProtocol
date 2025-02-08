import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Import CSS for styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get current path

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      <div className="sidebar-links">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>📊 Dashboard</Link>
        <Link to="/audits" className={location.pathname === "/audits" ? "active" : ""}>🔍 Audits</Link>
        <Link to="/clients" className={location.pathname === "/clients" ? "active" : ""}>👥 Clients</Link>
        <Link to="/transactions" className={location.pathname === "/transactions" ? "active" : ""}>💳 Transactions</Link>
        <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>⚙️ Settings</Link>
      </div>
    </div>
  );
};

export default Sidebar;
