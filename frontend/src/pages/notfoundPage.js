import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css"; // Import CSS for styling

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>🚧 404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default NotFoundPage;
