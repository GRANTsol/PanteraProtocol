import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const ClientForm = ({ clientId, onClientUpdated }) => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    registrationNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Client Data if Editing an Existing Client
  useEffect(() => {
    if (clientId) {
      const fetchClient = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`/api/clients/${clientId}`);
          setClientData(data);
        } catch (error) {
          setNotification({ type: "error", message: "Failed to load client data." });
        } finally {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [clientId]);

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  // 📌 Handle Form Submission (Create or Update Client)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      if (clientId) {
        await axios.put(`/api/clients/${clientId}`, clientData);
        setNotification({ type: "success", message: "Client updated successfully!" });
      } else {
        await axios.post("/api/clients", clientData);
        setNotification({ type: "success", message: "Client added successfully!" });
      }
      onClientUpdated(); // Refresh client list after update
    } catch (error) {
      setNotification({ type: "error", message: "Failed to save client data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form">
      <h2>{clientId ? "Edit Client" : "Add New Client"}</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={clientData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={clientData.email} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={clientData.address} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={clientData.phone} onChange={handleChange} required />

          <label>Registration Number:</label>
          <input type="text" name="registrationNumber" value={clientData.registrationNumber} onChange={handleChange} required />

          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : clientId ? "Update Client" : "Add Client"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientForm;
