import { useGetRecommendations } from "@/api/main";
import Recommendation from "./Recommendation";
import { Skeleton } from "../ui/skeleton";

export default function Recommendations() {
  const { data, isLoading } = useGetRecommendations();
  return (
    <>
      <p className="text-lg text-subtle_text">Recommendations</p>
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="bg-slate-200 h-40 w-full rounded-[28px]"
              />
            ))
          : data?.map((recommendation) => (
              <Recommendation
                recommendation={recommendation}
                key={recommendation.id}
              />
            ))}
      </div>
    </>
  );
}
