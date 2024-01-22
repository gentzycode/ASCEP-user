import { useNavigationContext } from "@/contexts/NavigationContext";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useAuthContext } from "@/providers/AuthProvider";

const Header = () => {
  const { activeModule } = useNavigationContext();
  const { user } = useAppContext();
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="sticky top-0 z-10 items-center justify-between hidden px-8 py-4 md:flex bg-light">
      <div>
        {activeModule === "main" ? (
          <h2 className="text-2xl font-bold">
            Good Morning {user?.firstname} 🤝
          </h2>
        ) : (
          <h2 className="text-2xl font-bold capitalize">{activeModule}</h2>
        )}
        <p className="text-lg text-subtle_text">
          Access our services seamlessly
        </p>
      </div>

      {user && <UserDropdown />}
      {!isLoggedIn && (
        <Link to="/auth/login">
          <Button size="sm" className="w-[120px] rounded-lg">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
