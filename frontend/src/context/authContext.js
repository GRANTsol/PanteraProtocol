import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📌 Load user from localStorage on app start
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data } = await axios.get("/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // 📌 Handle user login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  // 📌 Handle user logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
