import {
  Header,
  MobileNavigation,
  SideNavigation,
} from "@/components/layout-components";
import { Toaster } from "@/components/ui/toaster";
import NavigationContextProvider from "@/contexts/NavigationContext";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function MainLayout() {
  // if (!isLoggedIn) return <Navigate to="/auth/login" />;
  return (
    <NavigationContextProvider>
      <div>
        <MobileNavigation />
        <div className="w-full md:flex">
          <SideNavigation />
          <div className="flex-1 w-full max-w-[1440px] md:flex-auto md:h-screen md:overflow-y-scroll ">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
      <Toaster />
    </NavigationContextProvider>
  );
}
