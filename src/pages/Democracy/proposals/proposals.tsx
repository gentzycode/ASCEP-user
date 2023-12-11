import { AdvancedSearch, PagesHeroSection } from "@/components/Democracy";
import { Button } from "@/components/ui/button";
import { useProposalContext } from "@/contexts/ProposalContext";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { SDG_Images } from "@/utils/Democracy/Images";
import { CategoriesAndTarget_Data } from "@/utils/Democracy/Mock_Data";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface ProposalsHomePageProps {}
const ProposalsHomePage: React.FC<ProposalsHomePageProps> = () => {
  const {
    view,
    setView,
    fetchingDebates,
    fetchingDebatesError,
    fetchedDebatesData,
    refetchDebates,
    filterByButton,
  } = useProposalContext();
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectivesto decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";

  return (
    <DemocracyLayout>
      {/* HEADING */}
      <PagesHeroSection title="proposals" description={pageDescription} />
      <Link to={ROUTES.START_PROPOSAL_ROUTE}>
        <Button className="w-[175px] mb-4">Start a proposal</Button>
      </Link>
      <div className="xl:flex gap-16 mt-[50px] max-w-[1200px]">
        <div className="flex-1 max-w-[1200px]">
          <AdvancedSearch
            filterButtonOptions={proposalFilterButtonOptions}
            filterByButton={filterByButton}
            setView={setView}
            view={view}
          />

          {/* LIST VIEW */}
          {/* {view === "list view" && (
            <div className="grid grid-cols-1 my-10 gap-10">
              {Proposals_Data.map((proposal, index) => (
                <ListViewCard title={proposal.title} key={index} />
              ))}
            </div>
          )} */}
          {/* CARD VIEW */}
          {/* {view === "card view" && (
            <div className="grid grid-cols-1 my-10 gap-10">
              {Proposals_Data.map((proposal, index) => (
                <ProposalCardViewCard proposal={proposal} key={index} />
              ))}
            </div>
          )} */}
        </div>

        <div className="max-w-[400px]">
          {/*  Filters by Categories and Target  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Categories and Target
          </h2>
          <div className="flex flex-wrap gap-[9px] mt-[23px] max-w-[500px]">
            {CategoriesAndTarget_Data.map((item, index) => (
              <Button
                key={index}
                className="bg-transparent h-fit border-2 text-dark px-[20px] bg-light_grey text-[12px]"
              >
                {item}
              </Button>
            ))}
          </div>
          {/*  Filters by SDG  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6">
            Filters by SDG
          </h2>
          <div className="grid grid-cols-4 gap-[9px] justify-start max-w-[500px] mt-[23px]">
            {SDG_Images.map((item, index) => (
              <Button
                key={index}
                className="bg-transparent h-fit p-0 hover:bg-transparent flex justify-start"
              >
                <img src={item} alt={index.toString()} />
              </Button>
            ))}
          </div>

          {/* District  */}
          <h2 className="p-[10px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6">
            District
          </h2>
          <div className="w-full h-[300px] relative">
            <img
              src="/images/SDG/map.png"
              alt="map"
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </DemocracyLayout>
  );
};
export default ProposalsHomePage;
