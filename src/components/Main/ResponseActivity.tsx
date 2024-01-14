// import { Location } from "iconsax-react";

import { Link } from "react-router-dom";

export interface Activity {
  title: string;
  subtitle: string;
  img: string;
}
[];

interface ResponseActivityProps {
  activity: ReportData;
}

export default function ResponseActivity({ activity }: ResponseActivityProps) {
  return (
    <Link
      to={`/response/view-response/${activity.id}`}
      className=" rounded-[40px] bg-white min-w-[280px] max-w-[280px]  "
    >
      {activity.reportImages.length > 0 ? (
        <img
          src={activity.reportImages[0].image_url}
          className="h-[147px] w-full object-cover rounded-t-[20px]"
          alt=""
        />
      ) : (
        <div className="h-[147px] w-full bg-slate-400 rounded-t-[20px]"></div>
      )}

      <div className="px-4 py-3">
        <div className="flex justify-between gap-5">
          <p className="font-semibold text-dark ">{activity.title}</p>

          {/* <p className="text-[10px] w-full whitespace-nowrap flex-1 ml-auto">
            2h ago
          </p> */}
        </div>

        <div className="mt-2 mb-4 text-sm text-subtle_text line-clamp-4">
          {activity.description}
        </div>

        {/* <div className="flex items-center gap-2 text-sm font-medium">
          <Location size={14} />
          Umuleri, Anambra State
        </div> */}
      </div>
    </Link>
  );
}
