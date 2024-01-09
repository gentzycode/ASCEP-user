import { DataViewItem } from "@/components/Response";
import { FloatingLoader } from "@/components/custom";
import { useResponseContext } from "@/providers/ResponseProvider";

export default function DataView() {
  const { isLoading, reports } = useResponseContext();
  console.log("Reports:", reports);
  return (
    <div className="grid gap-4 ">
      {isLoading && <FloatingLoader />}
      {reports?.map((report) => (
        <DataViewItem key={report.id} report={report} />
      ))}
    </div>
  );
}
