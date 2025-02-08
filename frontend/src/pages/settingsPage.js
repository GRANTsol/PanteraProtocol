import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./SettingsPage.css"; // Import CSS for styling

const SettingsPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch User Profile from Backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser({ name: data.name, email: data.email, password: "" });
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load profile data." });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 📌 Handle Profile Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      await axios.put("/api/auth/profile", user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotification({ type: "success", message: "Profile updated successfully!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Profile Settings</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />

          <label>New Password (Optional):</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />

          <button type="submit" disabled={saving}>
            {saving ? <LoadingSpinner size="20px" /> : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SettingsPage;
