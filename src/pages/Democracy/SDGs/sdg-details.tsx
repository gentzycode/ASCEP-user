import * as React from "react";
import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface SdgDetailsPageProps {}
const SdgDetailsPage: React.FC<SdgDetailsPageProps> = () => {
  const { sdgData, fetchingSdgs } = useAppContext();
  const [SDG, setSDG] = useState<SDGsType>();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state.sdg) {
      setSDG(location.state.sdg);
    }
    if (location.state.id) {
      setSDG(() => sdgData.find((sdg) => sdg.id === location.state.id));
    }
  }, [sdgData]);

  return (
    <div>
      <div className="max-w-[900px]">
        <h3 className="text-[24px] lg:text-[36px] text-primary">
          The Sustainable Development Goals help
        </h3>
        <p className="text-sm md:text-base text-justify text-subtitle_text py-4">
          You can align your contributions to the community (debates, citizen
          proposals and investment projects) with the Sustainable Development
          Goals 2030 Agenda, this will allow us to have an overview of our
          contribution to each of the Sustainable Development Goals. Below you
          can find out about all the goals, their targets and localized targets.
        </p>
      </div>

      {fetchingSdgs && (
        <div className="flex items-center gap-2">
          <Skeleton className="!bg-clip-content bg-transparent">
            <p className="text-text">Loading SDGs</p>
          </Skeleton>
          <IconWrapper className=" text-primary bg-transparent my-10 w-fit h-fit rounded-full">
            <FaSpinner className="animate-spin text-[30px]" />
          </IconWrapper>
        </div>
      )}

      <div className="flex flex-wrap justify-start items-start gap-4  w-fit mt-5 max-w-[900px]">
        {sdgData?.map((sdg) => (
          <Button
            className={`bg-transparent h-[60px] w-[60px] p-0 hover:bg-transparent rounded-md overflow-hidden relative`}
            key={sdg.id}
            onClick={() => setSDG(sdg)}
          >
            <img
              src={sdg.banner}
              alt={sdg.description}
              className={`w-full h-full ${SDG?.id !== sdg.id && "grayscale"}`}
            />
            <div
              className={`absolute top-0 left-0 w-full h-full  ${
                SDG?.id !== sdg.id && "grayscale "
              }`}
            ></div>
          </Button>
        ))}
      </div>
      <Separator className=" my-8 bg-subtitle_text" />
      
      {SDG && (
        <div>
          <div className="flex gap-1 md:gap-2 items-center">
            <h4 className="text-xl md:text-3xl">{SDG.id}.</h4>
            <h3 className="text-xl md:text-3xl">{SDG.title}</h3>
          </div>
          <p className="pl-3 md:pl-8 my-6">{SDG.description}</p>
          <div className="pl-3 md:pl-8">
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit mb-8">
              Target
            </h2>
            <div className="flex flex-col gap-2">
              {SDG.sdgTarget.map((target) => (
                <div className="flex items-center gap-2">
                  <h1 className="text-base md:text-lg">{target.code}</h1>
                  <p className="text-subtitle_text text-sm md:text-base">
                    {target.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SdgDetailsPage;
