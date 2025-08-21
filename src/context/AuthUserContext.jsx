import { createContext, useContext, useEffect, useState } from "react";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("currentUser");
    try {
      return data && data !== "undefined" ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error al parsear currentUser:", error);
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
