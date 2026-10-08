import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("taskflow_token");

    if (!token) {
      setLoading(false);
      return;
    }

    auth
      .me()
      .then((response) => {
        setUser(response.data.data);
      })
      .catch(() => {
        localStorage.removeItem("taskflow_token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (data) => {
    const response = await auth.login(data);

    localStorage.setItem(
      "taskflow_token",
      response.data.data.token
    );

    setUser(response.data.data.user);

    return response;
  };

  const register = async (data) => {
    const response = await auth.register(data);

    localStorage.setItem(
      "taskflow_token",
      response.data.data.token
    );

    setUser(response.data.data.user);

    return response;
  };

  const logout = async () => {
    try {
      await auth.logout();
    } finally {
      localStorage.removeItem("taskflow_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);