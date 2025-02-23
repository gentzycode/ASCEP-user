import { Button } from "@/components/ui/button";
import {
  AdvancedSearch,
  FetchingError,
  InitiativesCardViewCard,
  ListViewCard,
  PagesHeroSection,
} from "@/components/Democracy";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";
import { useInitiativeContext } from "@/contexts/InitiativeContext";
import { initiativeFilterButtonOptions } from "@/utils/Democracy/Initiatives";
import { PageLoader, Pagination } from "@/components/custom";
import { useAuthContext } from "@/providers/AuthProvider";

const InitiativesHomePage = () => {
  const {
    view,
    setView,
    fetchingInitiatives,
    fetchingInitiativeError,
    fetchedInitiativeData,
    refetchInitiatives,
    filterByButton,
    filterOptions,
    setFilterOptions,
    page,
    setPage,
  } = useInitiativeContext();

  const { isLoggedIn } = useAuthContext();

  const pageDescription =
    "Initiatives is a citizen-driven feature that empowers individuals and groups to propose and promote actions or projects aimed at community improvement and development. Mirroring the essence of grassroots activism, this platform allows users to create and support initiatives, gather endorsements, and work towards bringing about tangible change. It provides a structured pathway for turning ideas into action, ensuring that community needs and aspirations are directly addressed. The Initiatives feature embodies the spirit of collaborative problem-solving and civic engagement, enabling citizens to take an active role in shaping their community's future.";
  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="initiatives" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.START_INITIATIVE_ROUTE}>
          <Button className="w-[175px] mb-4">Start Initiative</Button>
        </Link>
      )}
      <div className=" flex flex-col gap-16 mt-[50px] w-full">
        {/* ADVANCED SEARCH */}
        <AdvancedSearch
          filterButtonOptions={initiativeFilterButtonOptions}
          filterByButton={filterByButton}
          setView={setView}
          view={view}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingInitiatives}
          defaultFilterButtonValue="newest"
        />

        {/* ERROR */}
        {fetchingInitiativeError && !fetchingInitiatives && (
          <FetchingError
            message="Error fetching Initiatives"
            refetching={fetchingInitiatives}
            retryFunction={() => refetchInitiatives()}
          />
        )}

        {/* LOADING */}
        {fetchingInitiatives && <PageLoader />}

        {/* LIST VIEW */}
        {view === "list-view" && fetchedInitiativeData && (
          <div className="grid grid-cols-1 my-10 gap-10 max-w-[700px]">
            {fetchedInitiativeData?.initiatives.map((initiative) => (
              <ListViewCard
                title={initiative.title}
                route={ROUTES.PROPOSAL_INFO_ROUTE(initiative.id)}
                key={initiative.id}
              />
            ))}
          </div>
        )}

        {/* CARD VIEW */}
        {view === "card-view" && fetchedInitiativeData && (
          <div className="flex justify-start w-full">
            <div className="grid justify-start gap-10 my-10 grid-col-1 xl:grid-cols-2">
              {fetchedInitiativeData?.initiatives.map((initiative) => (
                <InitiativesCardViewCard
                  initiative={initiative}
                  key={initiative.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {fetchedInitiativeData &&
          fetchedInitiativeData.initiatives.length === 0 && (
            <h1 className="text-text text-base md:text-lg bg-primary/10 p-4 rounded-xl">
              No Initiatives
            </h1>
          )}
        {fetchedInitiativeData &&
          fetchedInitiativeData.initiatives.length !== 0 && (
            <Pagination
              paginationData={fetchedInitiativeData.meta}
              page={page}
              setPage={setPage}
            />
          )}
      </div>
    </>
  );
};

export default InitiativesHomePage;
