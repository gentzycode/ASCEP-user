import { useGetAllActivities } from "@/api/response";
import { ActivityItem } from "@/components/Response";
import { EmptyState, Pagination } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { useResponseContext } from "@/providers/ResponseProvider";
import { useState } from "react";

export default function ActivityPage() {
  const { filtersString } = useResponseContext();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllActivities({ filtersString, page });
  return (
    <div className="space-y-1">
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
      ) : data?.data.length ? (
        <>
          {data.data.map((activity, i) => (
            <ActivityItem
              activity={activity}
              position={
                data.data.length === 1
                  ? "only"
                  : i === 0
                  ? "first"
                  : i === data.data.length - 1
                  ? "last"
                  : "mid"
              }
              key={i}
            />
          ))}
          <Pagination
            page={page}
            setPage={setPage}
            paginationData={data.meta}
          />
        </>
      ) : (
        <div className="h-[80vh] ">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
