import { FooterLinks } from "@/utils/NavigationData";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark">
      <h1>ASCEP</h1>
      <div>
        {FooterLinks.map((link) => (
          <Link to={link.path} key={link.title}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
