import { useAuthContext } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) return <Navigate to="/auth/signup" />;
  return (
    <div>
      <Outlet />
    </div>
  );
}
