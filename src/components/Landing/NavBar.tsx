import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function NavBar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex py-8 justify-between items-center px-[100px]">
      <Link to="/home" className="flex items-center">
        <img src="/images/logopic.png" className="" alt="" />
        <p className="mb-4 text-xl font-bold text-white">ASCEP</p>
      </Link>

      <div className="flex items-center gap-8">
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
