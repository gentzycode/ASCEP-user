import { FooterLinks } from "@/utils/NavigationData";

const Footer = () => {
  return (
    <div className="bg-dark">
      <h1>ASCEP</h1>
      <div>
        {FooterLinks.map((link) => (
          <a href={link.path}>{link.title}</a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
