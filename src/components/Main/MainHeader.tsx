import { ArrowDown2, Notification, SearchNormal1 } from "iconsax-react";
import { IconWrapper } from "../custom";

export default function MainHeader() {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-2xl font-bold">Good Morning Dexter 🤝</h2>
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
}
