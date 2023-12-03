import { ArrowDown2, Notification, SearchNormal1 } from "iconsax-react";
import { IconWrapper } from "../custom";
import { useNavigationContext } from "@/contexts/NavigationContext";

const Header = () => {
  const { activeModule } = useNavigationContext();

  return (
    <div className="md:flex items-center justify-between hidden  px-8 py-4 bg-light sticky top-0 z-10">
      <div>
        {activeModule === "main" ? (
          <h2 className="text-2xl font-bold">Good Morning Dexter 🤝</h2>
        ) : (
          <h2 className="text-2xl font-bold capitalize">{activeModule}</h2>
        )}
        <p className="text-lg text-subtle_text">
          Access our services seamlessly
        </p>
      </div>

      <div className="flex items-center gap-6">
        <IconWrapper className="rounded-full cursor-pointer">
          <SearchNormal1 size="20" color="black" />
        </IconWrapper>
        <IconWrapper className="rounded-full cursor-pointer">
          <Notification size="20" color="black" />
        </IconWrapper>

        <div className="flex items-center gap-3 cursor-pointer">
          <img src="/images/profile-pic.png" className="w-10 h-10" alt="" />
          <div>
            <p className="text-sm font-bold">Dexter Olaniyi</p>
            <p className="text-sm text-subtle_text">Dexterola@gmail.com</p>
          </div>
          <ArrowDown2 size="20" color="black" />
        </div>
      </div>
    </div>
  );
};

export default Header;
