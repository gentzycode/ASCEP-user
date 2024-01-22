import { ReactNode, useEffect, useState } from "react";
import {
  AcceptingProjects,
  CurrentPhaseCard,
  FinishedBudget,
  Information,
  PublishValuation,
  ReviewingProjects,
  ReviewingVotes,
  SelectingProjects,
  ValuatingProjects,
  VotingProjects,
} from "@/components/Democracy";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useGetBudgetPhases,
  useGetCurrentBudget,
} from "@/api/democracy/budgeting";
import { IconWrapper } from "@/components/custom";
import { FaSpinner } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CurrentPhaseProp {}
interface AvailablePhaseType {
  phase_module_name: string;
  phase_module_code: string;
  component: ReactNode;
  id: string;
}

const CurrentPhase: React.FC<CurrentPhaseProp> = () => {
  const { data: currentBudget, isLoading } = useGetCurrentBudget();
  const { data: budgetPhases, isLoading: isLoadingPhases } =
    useGetBudgetPhases();
  const [currentPhase, setCurrentPhase] = useState("");

  const phaseTemplate = [
    {
      phase_module_name: "Information",
      phase_module_code: "information",
      component: <Information />,
    },
    {
      phase_module_name: "Accepting Projects",
      phase_module_code: "accepting_projects",
      component: <AcceptingProjects />,
    },
    {
      phase_module_name: "Selecting Projects",
      phase_module_code: "selecting_projects",
      component: <SelectingProjects />,
    },
    {
      phase_module_name: "Valuating Projects",
      phase_module_code: "valuating_projects",
      component: <ValuatingProjects />,
    },
    {
      phase_module_name: "Publish Valuation",
      phase_module_code: "publish_valuation",
      component: <PublishValuation />,
    },
    {
      phase_module_name: "Voting Projects",
      phase_module_code: "voting_projects",
      component: <VotingProjects />,
    },
    {
      phase_module_name: "Reviewing Votes",
      phase_module_code: "reviewing_votes",
      component: <ReviewingVotes />,
    },
    {
      phase_module_name: "Finished Budget",
      phase_module_code: "finished_budget",
      component: <FinishedBudget />,
    },
    {
      phase_module_name: "Reviewing projects",
      phase_module_code: "reviewing_projects",
      component: <ReviewingProjects />,
    },
  ];

  let availablePhase: AvailablePhaseType[] = [];

  availablePhase = (
    currentBudget
      ? phaseTemplate
          .map((template) => {
            const budgetPhase = currentBudget.budgetPhases.find(
              (phase) => phase.phase_module_code === template.phase_module_code
            );
            if (budgetPhase) {
              return { ...template, id: budgetPhase.id };
            }
          })
          .filter(Boolean)
      : []
  ) as AvailablePhaseType[];

  useEffect(() => {
    if (currentBudget)
      setCurrentPhase(
        currentBudget.budgetPhases.find((phase) => phase.current_phase)!.id
      );
  }, [currentBudget]);

  return (
    <>
      {/* LOADING */}
      {(isLoading || isLoadingPhases) && (
        <div className="w-full max-w-[1000px] h-[50vh] flex justify-center items-center">
          <Skeleton className="flex justify-center items-center flex-wrap gap-3 bg-transparent">
            <p className="text-lg text-primary">Loading current budget</p>
            <IconWrapper className="text-primary bg-transparent text-3xl">
              <FaSpinner className="animate-spin text-[40px]" />
            </IconWrapper>
          </Skeleton>
        </div>
      )}
      {currentBudget && (
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
              defaultValue={currentPhase}
              onValueChange={(value) => setCurrentPhase(value)}
              className="grid grid-cols-4 gap-4"
            >
              {currentBudget.budgetPhases.map((phase, i) => (
                <ToggleGroupItem
                  value={phase.id}
                  aria-label="Toggle bold"
                  className="h-fit disabled:opacity-100"
                  key={phase.id}
                  disabled={
                    !phase.current_phase &&
                    currentBudget.budgetPhases.find(
                      (phase) => !!phase.current_phase
                    )!.phase_index < phase.phase_index
                  }
                >
                  <CurrentPhaseCard
                    index={i}
                    phase={phase.phase_name}
                    active={currentPhase === phase.id}
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Separator
            orientation="horizontal"
            className="my-10 bg-subtitle_text"
          />
          <Tabs
            defaultValue="account"
            value={currentPhase}
            className="w-[400px]"
          >
            {availablePhase.length > 0 &&
              availablePhase?.map((phase) => (
                <TabsContent value={phase.id}>{phase.component}</TabsContent>
              ))}
          </Tabs>
        </div>
      )}
    </>
  );
};

export default CurrentPhase;
