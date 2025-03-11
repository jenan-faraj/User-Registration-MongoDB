import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3000/auth/login", { email, password }, { withCredentials: true });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  useEffect(() => {
    // إرسال الطلب مع الكوكيز باستخدام `withCredentials: true`
    axios
      .get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
