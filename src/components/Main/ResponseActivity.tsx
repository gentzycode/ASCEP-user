// import { Location } from "iconsax-react";

export interface Activity {
  title: string;
  subtitle: string;
  img: string;
}
[];

interface ResponseActivityProps {
  activity: Activity;
}

export default function ResponseActivity({ activity }: ResponseActivityProps) {
  return (
    <div className=" rounded-[40px] bg-white min-w-[280px] max-w-[280px]  ">
      <img
        src={activity.img}
        className="h-[147px] w-full object-cover rounded-t-[20px]"
        alt=""
      />

      <div className="px-4 py-3">
        <div className="flex justify-between gap-5">
          <p className="font-semibold text-dark ">{activity.title}</p>

          {/* <p className="text-[10px] w-full whitespace-nowrap flex-1 ml-auto">
            2h ago
          </p> */}
        </div>

        <div className="mt-2 mb-4 text-sm text-subtle_text line-clamp-4">
          {activity.subtitle}
        </div>

        {/* <div className="flex items-center gap-2 text-sm font-medium">
          <Location size={14} />
          Umuleri, Anambra State
        </div> */}
      </div>
    </div>
  );
}
