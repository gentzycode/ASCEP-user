import { DataViewItem } from "@/components/Response";
import { EmptyState } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { useResponseContext } from "@/providers/ResponseProvider";

export default function DataView() {
  const { isLoading, reports } = useResponseContext();
  console.log("Reports:", reports);
  return (
    <div className="grid gap-4 min-h-80vh ">
      {isLoading ? (
        <div className="space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="w-16 h-16 rounded-xl bg-slate-300" />
              <div className="w-full space-y-4">
                <Skeleton className="w-11/12 h-6 bg-slate-300" />
                <Skeleton className="w-11/12 h-6 bg-slate-300" />
                <Skeleton className="w-1/4 h-6 bg-slate-300" />
              </div>
            </div>
          ))}
        </div>
      ) : reports.length ? (
        reports?.map((report) => (
          <DataViewItem key={report.id} report={report} />
        ))
      ) : (
        <div className="h-[80vh] ">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
