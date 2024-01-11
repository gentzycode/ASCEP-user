import { useState } from "react";
import { CurrentPhaseCard } from "..";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CurrentPhaseProp {}
const currentPhaseData = [
  {
    name: "Information",
    value: "information",
  },
  {
    name: "Accepting Projects",
    value: "accepting-projects",
  },
  {
    name: "Selecting Projects",
    value: "selecting-projects",
  },
  {
    name: "Reviewing Projects",
    value: "reviewing-projects",
  },
  {
    name: "Valuating Projects",
    value: "valuating-projects",
  },
  {
    name: "Publish Valuation",
    value: "publish-valuation",
  },
  {
    name: "Voting Projects",
    value: "voting-projects",
  },
  {
    name: "Reviewing Votes",
    value: "reviewing-votes",
  },
  {
    name: "Finished Budget",
    value: "finished-budget",
  },
];

const CurrentPhase: React.FC<CurrentPhaseProp> = () => {
  const [currentPhase, setCurrentPhase] = useState("information");
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
      <div>
        <ToggleGroup
          type="single"
          value={currentPhase}
          onValueChange={(value) => setCurrentPhase(value)}
          className="grid grid-cols-4 gap-4"
        >
          {currentPhaseData.map((phase, i) => (
            <ToggleGroupItem
              value={phase.value}
              aria-label="Toggle bold"
              className="h-fit"
            >
              <CurrentPhaseCard
                index={i}
                phase={phase.name}
                active={currentPhase === phase.value}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Separator orientation="horizontal" className="my-10 bg-subtitle_text" />
    </div>
  );
};

export default CurrentPhase;
