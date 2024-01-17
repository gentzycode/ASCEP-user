import { Skeleton } from "../ui/skeleton";
import { ResponseActivity } from ".";
import { useGetAllReports } from "@/api/response";

export default function ResponseActivities() {
  const { data, isLoading } = useGetAllReports({ filtersString: "" });

  return (
    <>
      <p className="text-lg text-subtle_text">Response Activities</p>
      <div className="flex gap-4 pb-5 overflow-x-auto custom-scrollbar">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 w-[280px] rounded-xl bg-slate-200"
              ></Skeleton>
            ))
          : data &&
            data
              .slice(0, 5)
              .map((activity) => (
                <ResponseActivity key={activity.title} activity={activity} />
              ))}
      </div>
    </>
  );
}
