import {
  Header,
  MobileNavigation,
  SideNavigation,
} from "@/components/layout-components";
import NavigationContextProvider from "@/contexts/NavigationContext";
import { useAuthContext } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) return <Navigate to="/auth/login" />;
  return (
    <NavigationContextProvider>
      <div>
        <MobileNavigation />
        <div className="md:flex">
          <SideNavigation />
          <div className="flex-1 max-w-[1440px] md:flex-auto md:h-screen md:overflow-y-scroll">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </NavigationContextProvider>
  );
}
