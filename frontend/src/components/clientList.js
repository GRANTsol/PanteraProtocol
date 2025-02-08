import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 📌 Fetch Clients from Backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/api/clients");
        setClients(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to fetch clients." });
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // 📌 Handle Client Deletion
  const deleteClient = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    setNotification(null);
    try {
      await axios.delete(`/api/clients/${clientId}`);
      setClients(clients.filter((client) => client._id !== clientId));
      setNotification({ type: "success", message: "Client deleted successfully." });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to delete client." });
    }
  };

  return (
    <div className="client-list">
      <h2>Audit Clients</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registration No.</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="5">No clients registered yet.</td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.registrationNumber}</td>
                  <td>{client.phone}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteClient(client._id)}>❌ Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
