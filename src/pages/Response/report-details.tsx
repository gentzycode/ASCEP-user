import { useGetReportInfo, useGetReportComments } from "@/api/response";
import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";
import { FloatingLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/providers/AuthProvider";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ReportDetails() {
  const { reportId } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetReportInfo(reportId!);
  const { data: commentsData, isLoading: loadingComments } =
    useGetReportComments({ id: reportId!, page });

  const { logout, isLoggedIn } = useAuthContext();

  return (
    <div className="relative min-h-screen px-4 pt-4 pb-12 md:pt-0 md:px-12 space-y-7">
      {!isLoggedIn && (
        <div className="fixed z-50 w-full p-3 bg-white shadow-md md:p-4 max-w-64 right-10 top-16 md:top-20 rounded-xl ">
          <p className="text-sm">
            Signin to comment on this response and perform other interactions
          </p>
          <div className="flex justify-end mt-2">
            <Button onClick={logout} size="sm">
              Signin
            </Button>
          </div>
        </div>
      )}
      {isLoading && <FloatingLoader />}
      {data && (
        <>
          <h3 className="text-2xl">View Response</h3>
          {!!data.reportImages.length && (
            <ResponseImageSelect images={data?.reportImages} />
          )}
          <ResponseDetails report={data} />

          {/* Comments  */}
          {loadingComments
            ? Array.from({ length: 2 }).map(() => (
                <div className="space-y-4">
                  <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
                  <div className="space-y-4">
                    <Skeleton className="w-8/12 h-6 bg-slate-200" />
                    <Skeleton className="w-8/12 h-6 bg-slate-200" />
                    <Skeleton className="w-1/2 h-6 bg-slate-200" />
                  </div>
                </div>
              ))
            : !!commentsData?.comments.length &&
              commentsData.comments.map((comment) => (
                <ResponseComment
                  key={comment.id}
                  comment={comment}
                  reportId={reportId!}
                />
              ))}

          {!!commentsData?.comments.length && (
            <Pagination
              setPage={setPage}
              page={page}
              paginationData={commentsData?.meta}
            />
          )}
          {/* <ResponseComment /> */}
        </>
      )}
    </div>
  );
}
