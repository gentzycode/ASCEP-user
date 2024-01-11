import { Messages1, Profile2User } from "iconsax-react";

import {
  MainStatsCard,
  PopularPoll,
  Recommendation,
  ResponseActivity,
} from "@/components/Main";

export default function MainPage() {
  return (
    <div className="w-full px-8 pt-8  bg-[#F9F6FB] overflow-x-hidden  pb-12 ">
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
          {activities.map((activity) => (
            <ResponseActivity key={activity.title} activity={activity} />
          ))}
        </div>

        {/* POPULAR POLLS */}
        <p className="text-lg text-subtle_text">Popular Polls</p>

        <div className="space-y-4">
          <PopularPoll />
          {/* <PopularPoll /> */}
        </div>
      </div>
    </div>
  );
}

const activities = [
  {
    title: "Anambra State Govt Approves More Road Projects",
    subtitle:
      "The road construction revolution of Governor Chukwuma Soludo, got added boost as the Anambra State Executive Council, ANSEC, approved the release of the sum of five billion, two hundred and seventy million, six hundred and twenty thousand, eighty-two naira for the construction of Isuofia Township Roads (Phase 1) as an extension of the Igboukwu-Ikenga-Ekwulobia ongoing road project with a spur into Isuofia-Nanka.",
    img: "/public/images/activity-1.png",
  },
  {
    title: "ASUBEB Moves To Bridge Gap In Number Of Teachers In Schools",
    subtitle:
      "Primary school Heads in Anambra State have been urged to furnish government with accurate data to enable it bridge the gap in number of teachers in schools.",
    img: "/public/images/activity-2.png",
  },
  {
    title: "ASUBEB To Increase Monitoring, Assessment Of Schools, Teachers",
    subtitle:
      "The Executive Chairman, Anambra State Universal Basic Education Board, ASUBEB, Associate Professor Vera Nwadinobi says this year the agency will increase the monitoring and assessment of schools and teachers in Anambra State to raise the tempo of quality education in the state higher.",
    img: "/public/images/activity-4.png",
  },
  {
    title: "Digital Center",
    subtitle:
      "Collaboration with NITDA: to launch a digital economy empowerment project titled “The NITDA Digital Centre Project” at the community secondary school Isuofia. The digital centre is expected to provide the students at the Community Secondary School Isuofia with access to modern technology and the skills needed to thrive in today’s digital world.",
    img: "/public/images/activity-5.png",
  },
  {
    title: "The Anambra Cloud",
    subtitle:
      " The Agency had finalized the implementation of a public cloud service system that has ensured that all State data of Anambra are within the control of the State. This has increased cybersecurity, ensuring that the data of Anambra citizens are protected as well as it has saved the State millions of Naira by consolidating the numerous cloud providers being used by MDAs today.",
    img: "/public/images/activity-6.png",
  },
  {
    title: "Fibre Ducts",
    subtitle:
      " The Agency through a PPP is partnering with a telecom company that is in the process of laying 2,000km of fiber that will deepen that State’s public broadband access and ensure internet connectivity in all MDAs and selected public locations.",
    img: "/public/images/activity-1.png",
  },
];
