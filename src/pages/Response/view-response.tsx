import { useGetReportInfo } from "@/api/response";
import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";
import { FloatingLoader } from "@/components/custom";
import { useParams } from "react-router-dom";

export default function ViewResponsepage() {
  const { reportId } = useParams();

  const { data, isLoading } = useGetReportInfo(reportId!);
  return (
    <div className="min-h-screen px-6 space-y-7">
      {isLoading && <FloatingLoader />}
      {data && (
        <>
          <h3 className="text-2xl">View Response</h3>
          {!!data.reportImages.length && (
            <ResponseImageSelect images={data?.reportImages} />
          )}
          <ResponseDetails report={data} />
          <ResponseComment />
          <ResponseComment />
          <ResponseComment />
        </>
      )}
    </div>
  );
}
