import { Location } from "iconsax-react";
import { CommentInput } from "../custom";
import { usePostComment } from "@/api/response";

interface ResponseDetailsProps {
  report: ReportData;
}

export default function ResponseDetails({ report }: ResponseDetailsProps) {
  const { mutate, isLoading, isSuccess } = usePostComment();
  return (
    <div>
      <h3>{report.title}</h3>
      <div className="items-center gap-1 space-y-2 text-sm md:flex">
        <div className="flex items-center gap-1">
          <Location color="black" size={14} />
          <p>{report.location_meta}</p>
        </div>

        <div className="flex items-center gap-1">
          <p className="font-bold text-link">Posted by</p>
          <p>
            {report.reporter.firstname
              ? `${report.reporter.firstname} ${report.reporter.lastname}`
              : report.reporter.username}{" "}
            on {new Date(report.createdAt).toDateString()}
          </p>
        </div>
      </div>

      <div className="my-5 font-medium text-dark">
        <p>{report.description}</p>
      </div>

      <div className="flex gap-6">
        {report.reportSDGs.map((sdg) => (
          <img
            src={sdg.sdg.banner}
            className="w-16 h-16 rounded-lg "
            key={sdg.sdg_id}
            alt="sdg"
          />
        ))}
      </div>

      <div className="h-[210px] bg-cover relative my-5 shadow-sm rounded-[40px] ">
        {/* <GoogleMapReact
          // bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        ></GoogleMapReact> */}
        <img
          src="/images/anambra.png"
          className="object-cover w-full h-full"
          alt=""
        />

        <div className="absolute w-full px-2 md:px-20 bottom-3 md:bottom-10 ">
          <CommentInput
            isLoading={isLoading}
            handleSend={(data) => mutate({ ...data, report_id: report.id })}
            placeholder="Type your comment here"
            isSent={isSuccess}
          />
        </div>
      </div>
    </div>
  );
}
