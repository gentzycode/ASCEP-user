import MobileNavigation from "@/components/layout-components/MobileNavigation";
import SideNavigation from "@/components/layout-components/SideNavigation";
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
        <div className="flex w-full">
          <SideNavigation />
          <Outlet />
        </div>
      </div>
    </NavigationContextProvider>
  );
}
