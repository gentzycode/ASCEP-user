import { useGetAllActivities } from "@/api/response";
import { ActivityItem } from "@/components/Response";
import { FloatingLoader } from "@/components/custom";
import { useResponseContext } from "@/providers/ResponseProvider";

export default function ActivityPage() {
  const { filtersString } = useResponseContext();
  const { data, isLoading } = useGetAllActivities({ filtersString });
  return (
    <div className="space-y-1">
      {data?.data &&
        data.data.map((activity, i) => (
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
      {isLoading && <FloatingLoader />}
    </div>
  );
}
