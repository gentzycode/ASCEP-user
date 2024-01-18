import { Location } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ActivityItemProps {
  activity: ActivityData;
  position: "first" | "last" | "mid" | "only";
}

export default function ActivityItem({
  activity,
  position,
}: ActivityItemProps) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    switch (activity.action) {
      case "CREATE":
        setDescription(`New Response Created`);
        break;
      case "READ":
        setDescription(`Viewed Response`);
        break;
      case "COMMENT":
        setDescription(`New Comment Created`);
        break;
      case "DELETE":
        setDescription(`Response Deleted`);
        break;
      case "DELETE-COMMENT":
        setDescription(`Response Comment Deleted`);
        break;

      default:
        break;
    }
  }, [activity]);

  return (
    <Link
      to={`/response/reports/${activity.report.id}`}
      className={`bg-white hover:bg-[#FFF9F1] shadow-sm flex items-center justify-between py-[10px] px-[14px] ${
        position === "first"
          ? "rounded-t-[20px]"
          : position === "last"
          ? "rounded-b-[20px]"
          : position === "only"
          ? "rounded-t-[20px] rounded-b-[20px]"
          : ""
      } `}
    >
      <div className="space-y-1">
        <p className="text-sm">
          {description} “{activity.report.title}” by{" "}
          <strong>
            {activity?.refUser?.firstname} {activity?.refUser?.lastname}
          </strong>
        </p>
        <div className="flex items-center gap-1">
          <Location size={14} />
          <p className="text-xs">Umuleri, Anambra State</p>
        </div>
      </div>

      <p className="text-xs text-subtle_text">5 mins ago</p>
    </Link>
  );
}
