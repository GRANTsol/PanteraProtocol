import api from "./api";

// 📌 User Login
export const login = async (email, password) => {
  try {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};

// 📌 User Registration
export const register = async (name, email, password) => {
  try {
    const { data } = await api.post("/api/auth/register", { name, email, password });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Please try again.";
  }
};

// 📌 Fetch User Profile
export const getProfile = async () => {
  try {
    const { data } = await api.get("/api/auth/profile");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load profile.";
  }
};

// 📌 User Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
