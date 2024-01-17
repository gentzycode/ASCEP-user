import MainStatsCard from "./MainStatsCard 2";
import { Messages1, Profile2User } from "iconsax-react";

export default function MainAnalytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 ">
      <MainStatsCard icon={<Messages1 />} title="ASCEP Response" count={32} />
      <MainStatsCard
        icon={<Profile2User />}
        title="ASCEP Dialogue "
        count={321}
      />
      <MainStatsCard icon={<Messages1 />} title="ASCEP Democracy" count={321} />
    </div>
  );
}
