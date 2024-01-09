import { useGetPollInfo } from "@/api/democracy/voting";
import { ProposalsTab, QuestionsTab, ResultsTab } from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Danger } from "iconsax-react";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";

interface ConfigureVotingPageProp {}
const ConfigureVotingPage: React.FC<ConfigureVotingPageProp> = () => {
  const { pollId } = useParams();

  const { data: poll, isLoading: isLoadingPolls } = useGetPollInfo(pollId!);

  const TabData: { title: string; value: string; content: ReactNode }[] = [
    {
      title: "Questions",
      value: "questions",
      content: <QuestionsTab />,
    },
    {
      title: "Proposals",
      value: "proposals",
      content: <ProposalsTab proposals={poll?.proposals!} />,
    },
    {
      title: "Results",
      value: "results",
      content: <ResultsTab />,
    },
  ];

  return (
    <div>
      <div className="w-fit border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 mt-8 mb-12">
        <div className="flex justify-start items-center gap-4">
          <IconWrapper className="text-primary rounded-full p-2">
            <Danger size="35" />
          </IconWrapper>
          <p className="text-sm text-dark">
            Once the poll has started it will not be possible to create, edit or
            delete questions, answers or any content associated with the poll.
          </p>
        </div>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid grid-cols-3 h-fit bg-light_grey  w-full max-w-[400px]">
          {TabData.map((tab) => (
            <TabsTrigger
              value={tab.value}
              className="text-text text-base data-[state=active]:bg-primary"
              key={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TabData.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ConfigureVotingPage;
