import {
  MainAnalytics,
  PopularPolls,
  Recommendations,
  ResponseActivities,
} from "@/components/Main";

export default function MainPage() {
  return (
    <div className="flex-1 px-4 md:px-8 pt-8  bg-[#F9F6FB] overflow-x-hidden  pb-12 space-y-7 ">
      <MainAnalytics />

      <Recommendations />

      <ResponseActivities />

      <PopularPolls />
    </div>
  );
}
