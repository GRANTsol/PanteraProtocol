import React from "react";
import "./LoadingSpinner.css"; // Import CSS for styling

const LoadingSpinner = ({ size = "50px", color = "#00a8ff" }) => {
  return (
    <div className="loading-spinner" style={{ width: size, height: size, borderColor: `${color} transparent ${color} transparent` }}>
    </div>
  );
};

export default LoadingSpinner;
