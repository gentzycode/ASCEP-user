import { Location } from "iconsax-react";
import { Link } from "react-router-dom";

export default function ActivityPage() {
  return (
    <div className="space-y-1">
      {array.map((activity, i) => (
        <Link
          to="/response/view-response/1"
          className={`bg-white hover:bg-[#FFF9F1] shadow-sm flex items-center justify-between py-[10px] px-[14px] ${
            i === 0
              ? "rounded-t-[20px]"
              : i === array.length - 1
              ? "rounded-b-[20px]"
              : ""
          } `}
          key={activity}
        >
          <div className="space-y-1">
            <p className="text-sm">
              New <strong>Response</strong> created “Topic here”
            </p>
            <div className="flex items-center gap-1">
              <Location size={14} />
              <p className="text-xs">Umuleri, Anambra State</p>
            </div>
          </div>

          <p className="text-xs text-subtle_text">5 mins ago</p>
        </Link>
      ))}
    </div>
  );
}

const array = [1, 2, 3, 4, 5];
