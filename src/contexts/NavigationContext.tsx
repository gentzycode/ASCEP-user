import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  handleNavigation: (links: NavLinkType) => void;
  handleActiveLink: (links: NavLinkType) => void;
}
const NavigationContext = createContext({} as NavigationContextProps);
interface NavigationContextProviderProps {
  children: ReactNode;
}

const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState("Debates");
  const [activeModule, setActiveModule] = useState("ASCEP Democracy");
  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleMobileNav = () => setOpenMobileNav(!openMobileNav);
  const navigate = useNavigate();
  const handleNavigation = (link: NavLinkType) => {
    setActiveModule(link.title);
    navigate(link.path);
  };
  const handleActiveLink = (link: NavLinkType) => {
    setActiveLink(link.title);
    navigate(link.path);
  };
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
        handleNavigation,
        handleActiveLink,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);

export default NavigationContextProvider;
