import { DataViewItem } from "@/components/Response";
import { PageLoader } from "@/components/custom";
import { useResponseContext } from "@/providers/ResponseProvider";

export default function DataView() {
  const { isLoading, reports } = useResponseContext();
  console.log("Reports:", reports);
  return (
    <div className="space-y-4 ">
      {isLoading ? (
        <PageLoader />
      ) : (
        reports?.map((report) => (
          <DataViewItem key={report.id} report={report} />
        ))
      )}
    </div>
  );
}
