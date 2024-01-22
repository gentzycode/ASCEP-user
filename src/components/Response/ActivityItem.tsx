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
      className={`bg-white hover:bg-[#FFF9F1] shadow-sm gap-2 md:gap-4 flex items-start justify-between py-[10px] px-[14px] ${
        position === "first"
          ? "rounded-t-[20px]"
          : position === "last"
          ? "rounded-b-[20px]"
          : position === "only"
          ? "rounded-t-[20px] rounded-b-[20px]"
          : ""
      } `}
    >
      <img
        src={activity.refUser.profile_picture}
        alt=""
        className="w-8 h-8 rounded-full"
      />
      <p className="flex-1 text-sm">
        {description} “{activity.report.title}” by{" "}
        <strong>
          {activity?.refUser?.firstname} {activity?.refUser?.lastname}
        </strong>
      </p>
    </Link>
  );
}
