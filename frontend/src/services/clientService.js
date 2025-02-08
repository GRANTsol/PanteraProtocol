import api from "./api";

// 📌 Fetch All Clients
export const getAllClients = async () => {
  try {
    const { data } = await api.get("/api/clients");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load clients.";
  }
};

// 📌 Fetch Single Client by ID
export const getClientById = async (clientId) => {
  try {
    const { data } = await api.get(`/api/clients/${clientId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load client details.";
  }
};

// 📌 Create a New Client
export const createClient = async (clientData) => {
  try {
    const { data } = await api.post("/api/clients", clientData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create client.";
  }
};

// 📌 Update an Existing Client
export const updateClient = async (clientId, clientData) => {
  try {
    const { data } = await api.put(`/api/clients/${clientId}`, clientData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update client.";
  }
};

// 📌 Delete a Client
export const deleteClient = async (clientId) => {
  try {
    const { data } = await api.delete(`/api/clients/${clientId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete client.";
  }
};
