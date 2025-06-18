/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

type JWTPayload = {
  _id: string;
  isBusiness: boolean;
  isAdmin: boolean;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleToken = (token: string) => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      console.log("Decoded token:", decoded);

      setIsLoggedIn(true);
      setIsBusiness(decoded.isBusiness);
      setIsAdmin(decoded.isAdmin);
      setUserId(decoded._id);
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsLoggedIn(false);
      setIsBusiness(false);
      setIsAdmin(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    handleToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsBusiness(false);
    setIsAdmin(false);
    toast.success("Logged out successfully!");

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isBusiness, isAdmin, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
