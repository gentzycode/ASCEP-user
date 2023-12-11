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
    <DemocracyLayout>
      {/* HEADING */}
      <PagesHeroSection title="initiatives" description={pageDescription} />
      <div className="xl:flex justify-between gap-16 mt-[60px] ">
        {/* START OF LEFT SIDE */}
        <div className="flex-1">
          <AdvancedSearch
            filterButtonOptions={filterButtonOptions}
            setFilterOption={setFilterOption}
            filterOption={filterOption}
            setView={setView}
            view={view}
            advanceSearch={advanceSearch}
            setAdvanceSearch={setAdvanceSearch}
          />

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

        {/* START OF RIGHT SIDE */}
        <div className=" xl:w-[280px]">
          {/*  Filters by Status  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6 mt-4">
            Status
          </h2>
          <div className="grid  mt-[23px] gap-2 max-w-[500px]">
            <DemocracyMultipleCheckbox />
          </div>
          {/*  Filters by Scope  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6 mt-4">
            Scope
          </h2>
          <div className="grid  mt-[23px] gap-2 max-w-[500px]">
            <DemocracyMultipleCheckbox />
          </div>

          {/*  Filters by SDG  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6">
            Filters by SDG
          </h2>
          <div className="grid grid-cols-4 xl:grid-cols-3 gap-[9px] justify-start max-w-[400px] mt-[23px] ">
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

export default InitiativesHomePage;
