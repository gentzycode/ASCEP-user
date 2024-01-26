import config from "@/utils/config";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  token: string;
  setEmail: (arg: string) => void;
  login: (args: LoginResp) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  email: "",
  token: "",
  setEmail: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(config.key.isLoggedIn)
  );
  const [token] = useState(localStorage.getItem(config.key.accessToken) || "");
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location);

  const [email, setEmail] = useState("");

  const login = (args: LoginResp) => {
    localStorage.setItem(config.key.accessToken, args.accessToken);
    localStorage.setItem(config.key.refreshToken, args.refreshToken);
    localStorage.setItem(config.key.expiresAt, args.expiresAt);
    localStorage.setItem(config.key.isLoggedIn, "true");

    setIsLoggedIn(true);

    const redirect = localStorage.getItem(config.key.redirect);
    if (redirect) {
      navigate(redirect);
    } else navigate("/main");
  };

  const logout = () => {
    localStorage.removeItem(config.key.accessToken);
    localStorage.removeItem(config.key.refreshToken);
    localStorage.removeItem(config.key.isLoggedIn);
    localStorage.removeItem(config.key.expiresAt);
    localStorage.setItem(config.key.redirect, location.pathname);
    // navigate("/auth/login");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, email, setEmail, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
