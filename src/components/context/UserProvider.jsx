import React, { createContext, useState, useEffect, useContext } from "react";
import "./UserProvider.css";
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Simulate a delay if needed
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="authLoader">
          <span className="authLoader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
