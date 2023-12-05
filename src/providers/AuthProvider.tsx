import { PropsWithChildren, createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  setEmail: (arg: string) => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  email: "",
  setEmail: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}
