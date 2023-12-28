import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SubModuleCardProp {
  submodule: { title: string; summary: string; link: string };
}
const SubModuleCard: React.FC<SubModuleCardProp> = ({ submodule }) => {
  const { title, summary, link } = submodule;
  return (
    <div className="my-5 md:my-10">
      <h2 className="text-lg md:text-2xl capitalize py-1 text-text">{title}</h2>
      <p className="text-justify text-text text-base leading-7 py-2 ">
        {summary}
      </p>
      <Link to={link}>
        <Button className="w-[150px]">Get started</Button>
      </Link>
    </div>
  );
};

export default SubModuleCard;
