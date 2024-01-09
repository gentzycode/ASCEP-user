import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CloseCircle, HambergerMenu } from "iconsax-react";

interface NavBarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  scrollPosition: number;
}

export default function NavBar({
  isOpen,
  onOpen,
  onClose,
  scrollPosition,
}: NavBarProps) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex sticky top-0 z-[100] py-5 md:pt-8 md:pb-0 justify-between items-center px-4 md:px-10 lg:px-[100px] ${
        scrollPosition > 70 ? "backdrop-blur-sm " : ""
      } `}
    >
      <Link to="/home" className="flex items-center">
        <img src="/images/logopic.png" className="w-12 md:w-24" alt="" />
        <p className="mb-4 text-xl font-bold text-white">ASCEP</p>
      </Link>

      <div className="items-center hidden gap-8 md:flex">
        {navLinks.map((link) => (
          <div
            className="font-normal text-white cursor-pointer"
            onClick={() => scrollToSection(link.link)}
          >
            {link.name}
          </div>
        ))}

        <Link to="/home/contact-us">
          <Button className="w-[175px]">Contact</Button>
        </Link>
      </div>

      <HambergerMenu
        onClick={onOpen}
        className="inline-block mb-3 md:hidden text-white/70"
        size="28"
      />

      {/* MOBILE NAV */}

      <div
        className={` absolute z-[100] top-0 left-0 w-[100vw] backdrop-blur-sm bg-black/30 ${
          isOpen ? "h-screen " : "h-0"
        } `}
      >
        <div
          className={` ${
            isOpen ? "w-[80vw]" : "w-0"
          } duration-300 fixed top-0 left-0 h-screen z-20 bg-dark py-8 overflow-y-scroll`}
          // onClick={toggleMobileNav}
        >
          <button
            className={`${
              !isOpen && "hidden"
            } fixed right-[25px] top-[40px]  duration-1000`}
            onClick={onClose}
          >
            <CloseCircle color="white" />
          </button>

          <div>
            <Link to="/home" className="flex items-center px-2">
              <img src="/images/logopic.png" className="w-12 md:w-24" alt="" />
              <p className="mb-4 text-xl font-bold text-white">ASCEP</p>
            </Link>

            <div className="px-8 mt-10 space-y-8">
              {navLinks.map((link) => (
                <div
                  className="text-lg font-normal text-white cursor-pointer"
                  onClick={() => {
                    onClose();
                    scrollToSection(link.link);
                  }}
                >
                  {link.name}
                </div>
              ))}
              <div className="mt-10">
                <Link to="/home/contact-us">
                  <Button className="w-[175px]">Contact</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  {
    name: "About us",
    link: "about-us",
  },
  {
    name: "Services",
    link: "services",
  },
  {
    name: "F.A.Q",
    link: "faq",
  },
];
