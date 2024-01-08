import { Location } from "iconsax-react";
import { Link } from "react-router-dom";

interface DataViewItemProps {
  report: ReportData;
}

export default function DataViewItem({ report }: DataViewItemProps) {
  return (
    <Link to={`/response/view-response/${report.id}`}>
      <div className="flex gap-3 h-[160px] ">
        <img
          src={
            report.reportImages.length > 0
              ? report.reportImages[0].image_url
              : "/images/activity.png"
          }
          className="w-[165px] rounded-[20px]  object-cover "
          alt=""
        />

        <div className="py-6 px-[18px] bg-white w-full rounded-[20px] space-y-3  ">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-semibold">{report.title}</h4>

            <div
              className={` py-1 px-5 rounded-full ${
                report.reportStatus.name === "Public"
                  ? "text-[#31D0AA] bg-[#31D0AA]/10"
                  : "text-[#2F80ED] bg-[#2F80ED]/10"
              } `}
            >
              {report.reportStatus.name}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-dark">
            <Location color="black" size={16} />

            <p>{report.location_meta}</p>

            <p className="font-semibold text-link">Posted By</p>

            <p>
              {report.reporter?.firstname
                ? `${report.reporter?.firstname} ${report.reporter?.lastname}`
                : report.reporter.username}{" "}
              on {new Date(report.submission_date).toDateString()}
            </p>
          </div>

          <p className="text-sm text-ellipsis line-clamp-5 text-subtle_text ">
            {report.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
