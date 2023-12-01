import { PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: true,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
