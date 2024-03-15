// AdminAuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem("isAdminAuthenticated") === "true" // Initialize from local storage
  );

  useEffect(() => {
    localStorage.setItem("isAdminAuthenticated", isAdminAuthenticated); // Update local storage
  }, [isAdminAuthenticated]);

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
