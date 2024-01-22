import { useResponseContext } from "@/providers/ResponseProvider";
import { EmptyState } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllSurveys } from "@/api/survey";
import SurveyListItem from "./SurveyListItem";

export default function AllSurveys() {
  const { filtersString } = useResponseContext();
  const { data, isLoading } = useGetAllSurveys({
    filtersString: filtersString,
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2 min-h-80vh ">
      {isLoading ? (
        Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="w-16 h-16 rounded-xl bg-slate-300" />
            <div className="w-full space-y-4">
              <Skeleton className="w-11/12 h-6 bg-slate-300" />
              <Skeleton className="w-11/12 h-6 bg-slate-300" />
              <Skeleton className="w-1/4 h-6 bg-slate-300" />
            </div>
          </div>
        ))
      ) : data && data.length ? (
        data?.map((survey) => (
          <SurveyListItem key={survey.id} survey={survey} />
        ))
      ) : (
        <div className="h-[80vh] col-span-full  ">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
