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
      "Debates is a dynamic feature designed to engage the community in meaningful and structured discussions on a wide range of topics. This interactive platform allows citizens to voice their opinions, share insights, and engage in healthy debate on issues that matter to them and their community",
    link: ROUTES.DEBATES_HOME_ROUTE,
  },
  {
    title: "proposals",
    summary:
      "Proposals is a participatory feature where community members can submit suggestions or plans for new projects, policies, or changes within the community. This platform encourages users to present their ideas, which are then open for discussion, refinement, and voting by the community.",
    link: ROUTES.PROPOSALS_HOME_ROUTE,
  },
  {
    title: "initiatives",
    summary:
      "Initiatives is a citizen-driven feature that empowers individuals and groups to propose and promote actions or projects aimed at community improvement and development. Mirroring the essence of grassroots activism, this platform allows users to create and support initiatives, gather endorsements, and work towards bringing about tangible change.",
    link: ROUTES.INITIATIVES_HOME_ROUTE,
  },
  {
    title: "voting",
    summary:
      "Citizens' polls are a participatory mechanism by which citizens with voting rights can make direct decisions. This will help citizens vote on the relevant proposals and Initiatives for their community and collectives to decide directly how they want their city to be, after posting and creating sufficient support and effective plan.",
    link: ROUTES.VOTING_HOME_ROUTE,
  },
  {
    title: "budgeting",
    summary:
      "Budget is a key feature that introduces the concept of participatory budgeting to the community. It allows citizens to have a direct say in how a portion of the public budget is allocated. Users can propose, discuss, and vote on budget allocations for various community projects and initiatives. ",
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
