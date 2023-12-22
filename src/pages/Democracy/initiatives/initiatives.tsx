import { Button } from "@/components/ui/button";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { SDG_Images } from "@/utils/Democracy/Images";
import { Initiatives_Data } from "@/utils/Democracy/Mock_Data";
import { useState } from "react";
import {
  AdvancedSearch,
  DemocracyMultipleCheckbox,
  InitiativesCardViewCard,
  ListViewCard,
  PagesHeroSection,
} from "@/components/Democracy";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

const InitiativesHomePage = () => {
  const [filterOption, setFilterOption] = useState<string>("Most active");
  const [view, setView] = useState<string>("card view");
  const [advanceSearch, setAdvanceSearch] = useState<boolean>(false);
  const filterButtonOptions = [
    { label: "Recent", value: "recent" },
    { label: "Most Signed", value: "mostsigned" },
    { label: "Random", value: "random" },
    { label: "Signed", value: "signed" },
    { label: "Publish", value: "publish" },
  ];
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectivesto decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";
  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="initiatives" description={pageDescription} />
      <Link to={ROUTES.START_INITIATIVE_ROUTE}>
        <Button className="w-[175px] mb-4">Start Initiative</Button>
      </Link>
      <div className="xl:flex justify-between gap-16 mt-[60px] ">
        {/* START OF LEFT SIDE */}
        <div className="flex-1">
          {/* <AdvancedSearch
            filterButtonOptions={filterButtonOptions}
            setFilterOption={setFilterOption}
            filterOption={filterOption}
            setView={setView}
            view={view}
            advanceSearch={advanceSearch}
            setAdvanceSearch={setAdvanceSearch}
          /> */}

          {/* LIST VIEW */}
          {/* {view === "list view" && (
            <div className="grid grid-cols-1 my-10 gap-10">
              {Initiatives_Data.map((initiative, index) => (
                <ListViewCard debate={} title={initiative.title} key={index} />
              ))}
            </div>
          )} */}
          {/* CARD VIEW */}
          {view === "card view" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 my-10 gap-6">
              {Initiatives_Data.map((initiatives, index) => (
                <InitiativesCardViewCard
                  initiatives={initiatives}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InitiativesHomePage;
