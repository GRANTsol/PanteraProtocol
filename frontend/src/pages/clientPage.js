import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientList from "../components/ClientList";
import ClientForm from "../components/ClientForm";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import "./ClientPage.css"; // Import CSS for styling

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null); // Track client being edited

  // 📌 Fetch Clients from Backend
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await axios.get("/api/clients");
      setClients(data);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to load clients." });
    } finally {
      setLoading(false);
    }
  };

  // 📌 Handle Client Selection for Editing
  const handleEditClient = (clientId) => {
    setEditingClientId(clientId);
  };

  // 📌 Handle Client Update (After Add/Edit)
  const handleClientUpdated = () => {
    fetchClients(); // Refresh client list after update
    setEditingClientId(null);
  };

  return (
    <div className="client-page">
      <h1>👥 Audit Clients</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      {editingClientId ? (
        <ClientForm clientId={editingClientId} onClientUpdated={handleClientUpdated} />
      ) : (
        <ClientForm onClientUpdated={handleClientUpdated} />
      )}

      <h2>Registered Clients</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ClientList clients={clients} onEditClient={handleEditClient} />
      )}
    </div>
  );
};

export default ClientPage;
