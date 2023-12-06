import { DataViewItem } from "@/components/Response";

export default function DataView() {
  return (
    <div className="space-y-4 ">
      <DataViewItem type="Private" />
      <DataViewItem type="Public" />
    </div>
  );
}
