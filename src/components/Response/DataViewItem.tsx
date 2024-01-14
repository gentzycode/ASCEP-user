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
          className="hidden md:block w-full max-w-20 md:max-w-[165px] rounded-[20px]  object-cover "
          alt=""
        />

        <div className="md:py-6 md:px-[18px]  p-3 bg-white w-full rounded-xl md:rounded-[20px] space-y-3  ">
          <div className="flex items-center gap-3">
            <h4 className="text-base font-semibold md:text-xl">
              {report.title}
            </h4>

            <div
              className={` py-1 px-2 md:px-5 text-xs md:text-base rounded-full ${
                report.reportStatus.name === "Public"
                  ? "text-[#31D0AA] bg-[#31D0AA]/10"
                  : "text-[#2F80ED] bg-[#2F80ED]/10"
              } `}
            >
              {report.reportStatus.name}
            </div>
          </div>

          <div className="items-center gap-2 space-x-2 space-y-2 text-sm font-medium md:flex text-dark">
            <div className="flex items-center gap-2">
              <Location color="black" size={16} />

              <p>{report.location_meta}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-link">Posted By</p>

              <p>
                {report.reporter?.firstname
                  ? `${report.reporter?.firstname} ${report.reporter?.lastname}`
                  : report.reporter.username}{" "}
                on {new Date(report.submission_date).toDateString()}
              </p>
            </div>
          </div>

          <p className="text-sm line-clamp-2 md:line-clamp-2 xl:line-clamp-2 text-subtle_text ">
            {report.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
