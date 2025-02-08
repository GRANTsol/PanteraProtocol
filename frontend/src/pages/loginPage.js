import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./LoginPage.css"; // Import CSS for styling

const LoginPage = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // 📌 Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
      setUser(data); // Set user in global state
      navigate("/dashboard");
    } catch (error) {
      setNotification({ type: "error", message: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>🔐 Login</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="20px" /> : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
