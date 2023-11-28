import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";

export default function HomePage() {
  const { logout } = useAuthContext();

  return (
    <div className="flex flex-col items-center p-12 ">
      <h1 className="h1">Home Page </h1>
      <Button onClick={logout} variant="outline-primary">
        Logout
      </Button>
    </div>
  );
}
