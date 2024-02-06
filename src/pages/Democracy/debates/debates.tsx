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
    "Debates is a dynamic feature designed to engage the community in meaningful and structured discussions on a wide range of topics. This interactive platform allows citizens to voice their opinions, share insights, and engage in healthy debate on issues that matter to them and their community. Users can initiate debates, contribute to ongoing discussions, and even respond to others' viewpoints, fostering a culture of open dialogue and informed discourse. The Debates feature is instrumental in creating a participatory environment where diverse perspectives are welcomed and valued, ultimately contributing to more inclusive decision-making processes.";
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
      <div className=" mt-8">
        <AdvancedSearch
          filterButtonOptions={debateFilterButtonOptions}
          setView={setView}
          view={view}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingDebates}
          defaultFilterButtonValue="newest"
        />

        {/* ERROR */}
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

        {/* LOADING */}
        {fetchingDebates && <PageLoader />}

        {/* CARD VIEW */}
        {view === "card-view" && fetchedDebatesData && (
          <div className="flex justify-start w-full">
            <div className="grid justify-start gap-10 my-10 grid-col-1 lg:grid-cols-2">
              {fetchedDebatesData.debates.map((debate: DebateType) => (
                <DebatesCardViewCard debate={debate} key={debate.id} />
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {fetchedDebatesData && fetchedDebatesData.debates.length === 0 && (
          <h1 className="text-text text-base md:text-lg bg-primary/10 p-4 rounded-xl">
            No Debates
          </h1>
        )}
        {fetchedDebatesData && fetchedDebatesData.debates.length !== 0 && (
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
