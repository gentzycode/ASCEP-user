import { Link } from "react-router-dom";
import { SubModuleCard } from "..";
import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";

type DataProp = {
  title: string;
  summary: string;
  link: string;
};
const data: DataProp[] = [
  {
    title: "debates",
    summary:
      "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.",
    link: ROUTES.DEBATES_HOME_ROUTE,
  },
  {
    title: "proposals",
    summary:
      "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.",
    link: ROUTES.PROPOSALS_HOME_ROUTE,
  },
  {
    title: "initiatives",
    summary:
      "Citizens' Initiatives are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.",
    link: ROUTES.INITIATIVES_HOME_ROUTE,
  },
  {
    title: "voting",
    summary:
      "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.",
    link: ROUTES.VOTING_HOME_ROUTE,
  },
  {
    title: "budgeting",
    summary:
      "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.",
    link: ROUTES.BUDGETING_HOME_ROUTE,
  },
];

const SubModules = () => {
  return (
    <>
      <div className="py-2 grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.map((submodule, i) => (
          <SubModuleCard submodule={submodule} key={i} />
        ))}
      </div>
      {/* SDG */}
      <div className="bg-white rounded-3xl flex flex-col md:flex-row gap-6 p-3 md:p-8">
        <div>
          <div className="flex gap-2 items-center ">
            <img src="/images/SDG/sdg-logo.png" alt="sdg-logo" />
            <h1 className="text-2xl md:text-3xl capitalize py-1">SDGs</h1>
          </div>
          <h1 className="capitalize text-primary text-2xl lg:text-4xl">
            Sustainable development goals
          </h1>
        </div>
        <div>
          <p className="text-justify text-text text-base leading-7 py-2">
            The 17 SDGs are integrated—they recognize that action in one area
            will affect outcomes in others, and that development must balance
            social, economic and environmental sustainability.
          </p>
          <Link to={ROUTES.SDGs_HOME_ROUTE}>
            <Button className="w-[150px]">View</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubModules;
