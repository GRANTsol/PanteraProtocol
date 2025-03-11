import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
  });

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch User Data from Backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUserData(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load user profile." });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // 📌 Update User Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      await axios.put(`/api/users/${userId}`, userData);
      setNotification({ type: "success", message: "Profile updated successfully!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />

          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleChange} required />

          <label>Organization:</label>
          <input type="text" name="organization" value={userData.organization} onChange={handleChange} required />

          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
