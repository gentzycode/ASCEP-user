import { useGetAllReports } from "@/api/response";
import { DataViewItem } from "@/components/Response";
import { PageLoader } from "@/components/custom";

export default function DataView() {
  const { data, isLoading } = useGetAllReports();
  console.log(data);
  return (
    <div className="space-y-4 ">
      {isLoading ? (
        <PageLoader />
      ) : (
        data &&
        data?.map((report) => <DataViewItem key={report.id} report={report} />)
      )}

      {/* <DataViewItem type="Public" /> */}
    </div>
  );
}
