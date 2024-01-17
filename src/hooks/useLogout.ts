import { useAppContext } from "@/contexts/AppContext";
import { useAuthContext } from "@/providers/AuthProvider";

const useLogout = () => {
  const { logout } = useAuthContext();
  const { setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return handleLogout;
};

export default useLogout;
