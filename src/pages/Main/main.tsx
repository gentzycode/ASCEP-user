import { Messages1, Profile2User } from "iconsax-react";

import {
  MainStatsCard,
  PopularPoll,
  Recommendation,
  ResponseActivity,
} from "@/components/Main";

export default function MainPage() {
  return (
    <div className="w-full px-8 pt-8  bg-[#F9F6FB] overflow-x-hidden h-screen overflow-y-auto">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <div className="grid grid-cols-3 gap-6 ">
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
          <Recommendation />
        </div>

        {/* RESPONSE ACTIVITIES */}
        <p className="text-lg text-subtle_text">Recommendations</p>
        <div className="flex w-full gap-4 pb-5 overflow-x-auto custom-scrollbar">
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
        </div>

        {/* POPULAR POLLS */}
        <p className="text-lg text-subtle_text">Popular Polls</p>

        <div className="space-y-4">
          <PopularPoll />
          <PopularPoll />
        </div>
      </div>
    </div>
  );
}
