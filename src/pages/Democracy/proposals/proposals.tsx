import {
  AdvancedSearch,
  FetchingError,
  ListViewCard,
  PagesHeroSection,
  Pagination,
  ProposalCardViewCard,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useProposalContext } from "@/contexts/ProposalContext";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
import ROUTES from "@/utils/routesNames";
import { Danger } from "iconsax-react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ProposalsHomePageProps {}
const ProposalsHomePage: React.FC<ProposalsHomePageProps> = () => {
  const {
    view,
    setView,
    fetchingProposals,
    fetchingProposalError,
    fetchedProposalData,
    refetchProposals,
    filterByButton,
    getAllProposals,
    filterOptions,
    perPage,
    setFilterOptions,
  } = useProposalContext();
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectivesto decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";

  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="proposals" description={pageDescription} />
      <Link to={ROUTES.START_PROPOSAL_ROUTE}>
        <Button className="w-[175px] mb-4">Start a proposal</Button>
      </Link>
      <div className=" flex flex-col gap-16 mt-[50px] w-full max-w-[1200px]">
        <AdvancedSearch
          filterButtonOptions={proposalFilterButtonOptions}
          filterByButton={filterByButton}
          setView={setView}
          view={view}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        {fetchingProposalError && !fetchingProposals && (
          <FetchingError
            message="Error fetching Proposals"
            refetching={fetchingProposals}
            retryFunction={() => refetchProposals()}
          />
        )}

        {fetchingProposals && (
          <div className="w-full flex justify-center">
            <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
              <FaSpinner className="animate-spin text-[100px]" />
            </IconWrapper>
          </div>
        )}

        {/* LIST VIEW */}
        {view === "list-view" && fetchedProposalData && (
          <div className="grid grid-cols-1 my-10 gap-10">
            {fetchedProposalData?.proposals.map((proposal) => (
              <ListViewCard
                title={proposal.title}
                route={ROUTES.PROPOSAL_INFO_ROUTE(proposal.id)}
                key={proposal.id}
              />
            ))}
          </div>
        )}

        {/* CARD VIEW */}
        {view === "card-view" && fetchedProposalData && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14 justify-stretch">
            {fetchedProposalData?.proposals.map((proposal: ProposalType) => (
              <ProposalCardViewCard proposal={proposal} key={proposal.id} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {fetchedProposalData && (
          <Pagination
            meta={fetchedProposalData?.meta}
            onPageChange={getAllProposals}
            filterOptions={filterOptions}
            perPage={perPage}
          />
        )}
      </div>
    </>
  );
};
export default ProposalsHomePage;
