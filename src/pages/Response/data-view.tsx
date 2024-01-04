import { useGetAllReports } from "@/api/response";
import { DataViewItem } from "@/components/Response";

export default function DataView() {
  const { data } = useGetAllReports();
  console.log(data);
  return (
    <div className="space-y-4 ">
      <DataViewItem type="Private" />
      <DataViewItem type="Public" />
    </div>
  );
}
