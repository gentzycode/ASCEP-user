import { AllReports, AllSurveys } from "@/components/Response";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";

export default function DataView() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Tabs defaultValue={state?.tab || "reports"}>
      <TabsList className="gap-2 mb-5">
        <TabsTrigger
          className="h-10 px-12 rounded-xl bg-slate-200 data-[state=active]:bg-primary "
          value="reports"
          onClick={() =>
            navigate("/response/data-view", {
              state: { tab: "reports" },
            })
          }
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          className="h-10 px-12 rounded-xl bg-slate-200 data-[state=active]:bg-primary "
          value="surveys"
          onClick={() =>
            navigate("/response/data-view", {
              state: { tab: "surveys" },
            })
          }
        >
          Surveys
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reports">
        <AllReports />
      </TabsContent>
      <TabsContent value="surveys">
        <AllSurveys />
      </TabsContent>
    </Tabs>
  );
}
