import {
  AdvancedSearch,
  FetchingError,
  ListViewCard,
  PagesHeroSection,
  ProposalCardViewCard,
} from "@/components/Democracy";
import { PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useProposalContext } from "@/contexts/ProposalContext";
import { useAuthContext } from "@/providers/AuthProvider";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
import ROUTES from "@/utils/routesNames";
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
    filterOptions,
    page,
    setFilterOptions,
    setPage,
  } = useProposalContext();
  const pageDescription =
    "Proposals is a participatory feature where community members can submit suggestions or plans for new projects, policies, or changes within the community. This platform encourages users to present their ideas, which are then open for discussion, refinement, and voting by the community. It's a space where innovative ideas are nurtured and developed through collective wisdom. The Proposals feature plays a critical role in ensuring that governance is responsive and inclusive, allowing citizens to directly influence the agenda and priorities of their community.";
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="proposals" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.START_PROPOSAL_ROUTE}>
          <Button className="w-[175px] mb-4">Start a proposal</Button>
        </Link>
      )}
      <div className=" flex flex-col gap-16 mt-[50px] w-full max-w-[1200px]">
        {/* ADVANCED SEARCH */}
        <AdvancedSearch
          filterButtonOptions={proposalFilterButtonOptions}
          filterByButton={filterByButton}
          setView={setView}
          view={view}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingProposals}
          defaultFilterButtonValue="newest"
        />

        {/* ERROR */}
        {fetchingProposalError && !fetchingProposals && (
          <FetchingError
            message="Error fetching Proposals"
            refetching={fetchingProposals}
            retryFunction={() => refetchProposals()}
          />
        )}

        {/* LOADING */}
        {fetchingProposals && <PageLoader />}

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
        {fetchedProposalData && fetchedProposalData.proposals.length === 0 && (
          <h1 className="text-text text-base md:text-lg bg-primary/10 p-4 rounded-xl">
            No Proposals
          </h1>
        )}
        {fetchedProposalData && fetchedProposalData.proposals.length !== 0 && (
          <Pagination
            page={page}
            paginationData={fetchedProposalData.meta}
            isFetching={fetchingProposals}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};
export default ProposalsHomePage;
