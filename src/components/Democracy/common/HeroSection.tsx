import { Button } from "../../ui/button";

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <>
      <h1 className="tracking-[1px]  text-left font-sans text-dark text-[30px] md:text-[60px] capitalize">
        {title}
      </h1>
      <p className="text-[24px] text-subtle_text my-6 max-w-[800px] text-justify ">
        {description}
      </p>
      <div className="flex justify-start items-center gap-8 md:flex-row">
        <Button className="w-[175px]">Get started</Button>
        <Button className="bg-transparent border-dark border-2 w-[175px]">
          Log in
        </Button>
      </div>
    </>
  );
};

export default HeroSection;
