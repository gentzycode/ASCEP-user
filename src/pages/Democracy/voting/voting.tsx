import {
  FetchingError,
  FilterButtons,
  PagesHeroSection,
  Pagination,
  PollLIst,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useVotingContext } from "@/contexts/VotingContext";
import { useAuthContext } from "@/providers/AuthProvider";
import { votingFilterButtonOptions } from "@/utils/Democracy/Voting";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface VotingHomePageProp {}
const pageDescription =
  "Citizens' polls are a participatory mechanism by which citizens with voting rights can make direct decisions. This will help citizens vote on the relevant  proposals and Initiatives for their community and collectives to decide directly how they want their city to be, after posting and creating sufficient support and effective plan.";

const VotingHomePage: React.FC<VotingHomePageProp> = () => {
  const {
    fetchedPollsData,
    fetchingPolls,
    fetchingPollsError,
    refetchPolls,
    getAllPolls,
    filterOptions,
    perPage,
    setPage,
    filterByButton,
  } = useVotingContext();

  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="voting" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.START_POLL_ROUTE}>
          <Button className="w-[175px] mb-4">Create a Poll</Button>
        </Link>
      )}

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={votingFilterButtonOptions}
          filterByButton={filterByButton}
        />
      </div>

      {/* LOADING */}
      {fetchingPolls && <PageLoader />}

      {/* ERROR */}
      {fetchingPollsError && !fetchingPolls && (
        <FetchingError
          message="Error fetching Polls"
          refetching={fetchingPolls}
          retryFunction={() => refetchPolls()}
        />
      )}

      {/* POLLS LIST */}
      {fetchedPollsData?.polls && <PollLIst polls={fetchedPollsData.polls} />}

      {/* PAGINATION */}
      {fetchedPollsData && (
        <Pagination
          meta={fetchedPollsData?.meta}
          onPageChange={getAllPolls}
          filterOptions={filterOptions}
          perPage={perPage}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default VotingHomePage;
