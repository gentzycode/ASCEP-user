import { Skeleton } from "../ui/skeleton";
import { useGetAllReports } from "@/api/response";
import ResponseActivity from "./ResponseActivity";

export default function ResponseActivities() {
  const { data, isLoading } = useGetAllReports({ filtersString: "" });

  return (
    <div className="flex-1 space-y-6 ">
      <p className="text-lg text-subtle_text">Response Activities</p>
      <div className="grid flex-1 grid-cols-1 gap-8 pb-5 overflow-x-auto xl:gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 rounded-xl bg-slate-200"
              ></Skeleton>
            ))
          : data &&
            data
              .slice(0, 4)
              .map((activity) => (
                <ResponseActivity key={activity.title} activity={activity} />
              ))}
      </div>
    </div>
  );
}
