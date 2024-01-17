import { Skeleton } from "@/components/ui/skeleton";
import { useGetPopularPolls } from "@/api/democracy/voting";
import { PopularPoll } from ".";

export default function PopularPolls() {
  const { data: popularPolls, isLoading: loadingPolls } = useGetPopularPolls();

  return (
    <>
      {/* POPULAR POLLS */}
      <p className="text-lg text-subtle_text">Popular Polls</p>

      <div className="space-y-4">
        {loadingPolls ? (
          <Skeleton className="h-40 rounded-[40px] bg-slate-200" />
        ) : (
          popularPolls?.map((popularPoll) => (
            <PopularPoll key={popularPoll.id} poll={popularPoll} />
          ))
        )}
      </div>
    </>
  );
}
