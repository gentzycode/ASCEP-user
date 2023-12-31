import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface ConfigureVotingPageProp {}
const ConfigureVotingPage: React.FC<ConfigureVotingPageProp> = () => {
  return (
    <Tabs defaultValue="questions" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3 h-fit bg-subtle_text ">
        <TabsTrigger value="questions" className="text-text text-base">
          Questions (5)
        </TabsTrigger>
        <TabsTrigger value="proposals" className="text-text text-base">
          Proposals
        </TabsTrigger>
        <TabsTrigger value="results" className="text-text text-base">
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="questions">
        <h1>Questions</h1>
      </TabsContent>
      <TabsContent value="proposals">
        <h1>proposals</h1>
      </TabsContent>
      <TabsContent value="results">
        <h1>Results</h1>
      </TabsContent>
    </Tabs>
  );
};

export default ConfigureVotingPage;
