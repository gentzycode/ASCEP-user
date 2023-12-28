import { useState } from "react";
import { CurrentPhaseCard } from "..";
import { Separator } from "@/components/ui/separator";

interface CurrentPhaseProp {}
const CurrentPhase: React.FC<CurrentPhaseProp> = () => {
  const [currentPhase, setCurrentPhase] = useState("Information");
  return (
    <div className="my-14">
      <h2 className="text-text text-2xl md:text-4xl">Current Phase</h2>
      <div className="flex gap-6 py-8 flex-wrap">
        <p className="text-lg text-primary">Voting project</p>
        <p className="text-text capitalize text-xl">
          December 26, 2023 - January 25, 2024
        </p>
      </div>

      {/* CURRENT PHASE CARD */}
      <div className="flex gap-4 flex-wrap">
        <CurrentPhaseCard />
        <CurrentPhaseCard />
        <CurrentPhaseCard />
        <CurrentPhaseCard />
        <CurrentPhaseCard />
        <CurrentPhaseCard />
        <CurrentPhaseCard />
      </div>
      <Separator orientation="horizontal" className="my-10 bg-subtitle_text"/>
    </div>
  );
};

export default CurrentPhase;
