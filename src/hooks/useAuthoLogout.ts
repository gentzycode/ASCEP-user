import { useAuthContext } from "@/providers/AuthProvider";
import config from "@/utils/config";
import { useEffect } from "react";

const useAutoLogout = () => {
  const { logout } = useAuthContext();
  const expiresAt = localStorage.getItem(config.key.expiresAt);
  useEffect(() => {
    // Parse the logout time string
    const logoutTimestamp = new Date(expiresAt || 0).getTime();

    // Calculate the time remaining until logout
    const timeRemaining = logoutTimestamp - new Date().getTime();

    // Set up a timeout to automatically log out the user when the time is reached
    const timeoutId = setTimeout(() => {
      // Perform the logout action (replace this with your actual logout logic)
      logout();
    }, timeRemaining);

    // Clear the timeout when the component is unmounted or when the logout time is reached
    return () => clearTimeout(timeoutId);
  }, [expiresAt]);
};

export default useAutoLogout;
