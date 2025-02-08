import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./RegisterPage.css"; // Import CSS for styling

const RegisterPage = ({ setUser }) => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // 📌 Handle Registration Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const { data } = await axios.post("/api/auth/register", userData);
      localStorage.setItem("token", data.token);
      setUser(data); // Set user in global state
      navigate("/dashboard");
    } catch (error) {
      setNotification({ type: "error", message: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1>📝 Register</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="20px" /> : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
