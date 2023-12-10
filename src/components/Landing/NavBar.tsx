import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <div className="flex py-8 justify-between  items-center px-[100px]">
      <div className="flex items-center">
        <img src="/images/logopic.png" className="" alt="" />
        <p className="mb-4 text-xl font-bold text-white">ASCEP</p>
      </div>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            className="font-normal text-white"
            to={link.link}
            key={link.name}
          >
            {link.name}
          </Link>
        ))}

        <Button className="w-[175px]">Contact</Button>
      </div>
    </div>
  );
}

const navLinks = [
  {
    name: "About us",
    link: "#",
  },
  {
    name: "Services",
    link: "#",
  },
  {
    name: "F.A.Q",
    link: "#",
  },
];
