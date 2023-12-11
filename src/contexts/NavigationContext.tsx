import { ReactNode, createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface NavigationContextProps {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  openMobileNav: boolean;
  setOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMobileNav: () => void;
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
  activeModule: string;
  setActiveModule: React.Dispatch<React.SetStateAction<string>>;
  location: LocationParams;
}
const NavigationContext = createContext({} as NavigationContextProps);
interface NavigationContextProviderProps {
  children: ReactNode;
}

2;

export interface LocationParams {
  pathname: string;
  state: string;
  search: string;
  hash: string;
  key: string;
}

const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string>("");
  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleMobileNav = () => setOpenMobileNav(!openMobileNav);
  const [activeLink, setActiveLink] = useState<string>("");

  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname.split("/").slice(0, 3).join("/"));
    setActiveModule(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <NavigationContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        toggleSidebar,
        openMobileNav,
        setOpenMobileNav,
        toggleMobileNav,
        activeLink,
        setActiveLink,
        activeModule,
        setActiveModule,
        location,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);

export default NavigationContextProvider;
