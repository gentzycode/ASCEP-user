import { Messages1, Profile2User } from "iconsax-react";

import {
  MainStatsCard,
  PopularPoll,
  Recommendation,
  ResponseActivity,
} from "@/components/Main";
import { useGetAllReports } from "@/api/response";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPopularPolls } from "@/api/democracy/voting";

export default function MainPage() {
  const { data, isLoading } = useGetAllReports({ filtersString: "" });

  // const {
  //   data: commentsData,
  //   isLoading: isLoadingComments,
  //   refetch,
  //   isFetching: isFetchingComments,
  // } = useGetPollComments(pollId!, page, filter);

  const { data: popularPolls } = useGetPopularPolls();
  console.log(popularPolls);

  return (
    <div className="w-full px-4 md:px-8 pt-8  bg-[#F9F6FB] overflow-x-hidden  pb-12 ">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <div className="grid gap-6 lg:grid-cols-3 ">
          <MainStatsCard
            icon={<Messages1 />}
            title="ASCEP Response"
            count={32}
          />
          <MainStatsCard
            icon={<Profile2User />}
            title="ASCEP Dialogue "
            count={321}
          />
          <MainStatsCard
            icon={<Messages1 />}
            title="ASCEP Democracy"
            count={321}
          />
        </div>

        {/* RECOMMENDATIONS */}
        <p className="text-lg text-subtle_text">Recommendations</p>
        <div className="space-y-4">
          <Recommendation />
          {/* <Recommendation /> */}
        </div>

        {/* RESPONSE ACTIVITIES */}
        <p className="text-lg text-subtle_text">Response Activities</p>
        <div className="flex gap-4 pb-5 overflow-x-auto custom-scrollbar">
          {isLoading ? (
            <Skeleton className="h-28 rounded-xl bg-slate-200"></Skeleton>
          ) : (
            data &&
            data
              .slice(0, 5)
              .map((activity) => (
                <ResponseActivity key={activity.title} activity={activity} />
              ))
          )}
        </div>

        {/* POPULAR POLLS */}
        <p className="text-lg text-subtle_text">Popular Polls</p>

        <div className="space-y-4">
          {/* {commentsData.comments.map((comment: CommentType) => (
            <PollCommentCard comment={comment} key={comment.id} />
          ))} */}

          {popularPolls?.map((popularPoll) => (
            <PopularPoll key={popularPoll.id} poll={popularPoll} />
          ))}

          {/* <PopularPoll /> */}
        </div>
      </div>
    </div>
  );
}
