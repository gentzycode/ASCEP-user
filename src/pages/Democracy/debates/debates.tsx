import {
  AdvancedSearch,
  DebatesCardViewCard,
  FetchingError,
  ListViewCard,
  PagesHeroSection,
} from "@/components/Democracy";
import { PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useDebateContext } from "@/contexts/DebateContext";
import { useAuthContext } from "@/providers/AuthProvider";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface DebatesProps {}
const DebatesHomePage: React.FC<DebatesProps> = () => {
  const {
    view,
    setView,
    fetchingDebates,
    fetchingDebatesError,
    fetchedDebatesData,
    refetchDebates,
    filterByButton,
    filterOptions,
    setFilterOptions,
    setPage,
    page,
  } = useDebateContext();
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="debates" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.PUBLISH_DEBATE_ROUTE}>
          <Button className="w-[175px] mb-4">Start debate</Button>
        </Link>
      )}

      {/* ADVANCED SEARCH */}
      <div className="max-w-[1000px] mt-8">
        <AdvancedSearch
          filterButtonOptions={debateFilterButtonOptions}
          setView={setView}
          view={view}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingDebates}
        />
        {fetchingDebatesError && !fetchingDebates && (
          <FetchingError
            message="Error fetching Debates"
            refetching={fetchingDebates}
            retryFunction={() => refetchDebates()}
          />
        )}
        {/* LIST VIEW */}
        {view === "list-view" && fetchedDebatesData && (
          <div className="grid grid-cols-1 my-10 gap-10 max-w-[700px]">
            {fetchedDebatesData.debates.map((debate: DebateType) => (
              <ListViewCard
                title={debate.title}
                route={ROUTES.DEBATE_INFO_ROUTE(debate.id)}
                key={debate.id}
              />
            ))}
          </div>
        )}
        {fetchingDebates && <PageLoader />}
        {/* CARD VIEW */}
        {view === "card-view" && fetchedDebatesData && (
          <div className="w-full flex justify-start">
            <div className="grid grid-col-1 lg:grid-cols-2  justify-start my-10 gap-10">
              {fetchedDebatesData.debates.map((debate: DebateType) => (
                <DebatesCardViewCard debate={debate} key={debate.id} />
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {fetchedDebatesData && fetchedDebatesData.debates.length === 0 && (
          <h1 className="text-dark text-base md:text-lg bg-primary/10 p-4">
            No Debates meets the search criteria
          </h1>
        )}
        {fetchedDebatesData && (
          <Pagination
            paginationData={fetchedDebatesData?.meta}
            page={page}
            setPage={setPage}
            isFetching={fetchingDebates}
          />
        )}
      </div>
    </>
  );
};
export default DebatesHomePage;
