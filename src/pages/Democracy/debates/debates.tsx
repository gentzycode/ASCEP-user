import {
  AdvancedSearch,
  DebatesCardViewCard,
  ListViewCard,
  PagesHeroSection,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/contexts/AppContext";
import { useDebateContext } from "@/contexts/DebateContext";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import { CategoriesAndTarget_Data } from "@/utils/Democracy/Mock_Data";
import ROUTES from "@/utils/routesNames";
import { Danger } from "iconsax-react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DebatesProps {}
const DebatesHomePage: React.FC<DebatesProps> = () => {
  const { fetchingSdgs, sdgData } = useAppContext();
  const {
    view,
    setView,
    fetchingDebates,
    fetchingDebatesError,
    fetchedDebatesData,
    refetchDebates,
    filterByButton,
    setSearchtext,
  } = useDebateContext();
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";

  console.log("refreshed");

  return (
    <DemocracyLayout>
      {/* HEADING */}
      <PagesHeroSection title="debates" description={pageDescription} />
      <Link to={ROUTES.START_DEBATE_ROUTE}>
        <Button className="w-[175px]">Start debate</Button>
      </Link>
      {/* ADVANCED SEARCH */}
      <div className="xl:flex gap-16 mt-[50px] max-w-[1200px]">
        <div className="flex-1 max-w-[1200px]">
          <AdvancedSearch
            filterButtonOptions={debateFilterButtonOptions}
            setView={setView}
            view={view}
            filterByButton={filterByButton}
            setSearchtext={setSearchtext}
          />
          {/* LIST VIEW */}
          {view === "list-view" && fetchedDebatesData && (
            <div className="grid grid-cols-1 my-10 gap-10">
              {fetchedDebatesData!.data.map((debate: DebateType) => (
                <ListViewCard debate={debate} key={debate.id} />
              ))}
            </div>
          )}
          {/* CARD VIEW */}
          <div className="flex justify-center items-center">
            {fetchingDebates && (
              <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
                <FaSpinner className="animate-spin text-[100px]" />
              </IconWrapper>
            )}
            {view === "card-view" && fetchedDebatesData && (
              <div className="grid grid-cols-1 my-10 gap-10">
                {fetchedDebatesData!.data.map((debate: DebateType) => (
                  <DebatesCardViewCard debate={debate} key={debate.id} />
                ))}
              </div>
            )}
          </div>

          {fetchingDebatesError && (
            <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
              <div className="flex justify-start items-center gap-1">
                <IconWrapper className="text-primary rounded-full">
                  <Danger size="32" />
                </IconWrapper>
                <p className="text-[16px]">Error fetching debates</p>
              </div>
              <Button className="w-fit h-fit" onClick={refetchDebates}>
                Retry
              </Button>
            </div>
          )}
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
            {fetchingSdgs ? (
              <IconWrapper className=" text-primary my-10 w-fit h-fit rounded-full">
                <FaSpinner className="animate-spin text-[50px]" />
              </IconWrapper>
            ) : (
              <>
                {sdgData?.data.map((sdg) => (
                  <div
                    className="h-fit p-0 flex justify-start relative overflow-hidden rounded-lg"
                    key={sdg.id}
                  >
                    <Checkbox
                      className="border-dark absolute top-0 left-0 w-full h-full border-transparent
                      opacity-60 checked:bg-primary appearance-none rounded-lg
                    "
                      onCheckedChange={(checked) => {
                        // return checked
                        //   ? setSdg((values) => [...values, { ...item }])
                        //   : setSdg((values) => {
                        //       return values.filter(
                        //         (value) => value.id !== item.id
                        //       );
                        //     });
                      }}
                    />
                    <img src={sdg.banner} alt={sdg.title} />
                  </div>
                ))}
              </>
            )}
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
export default DebatesHomePage;
