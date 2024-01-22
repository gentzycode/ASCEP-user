/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from "iconsax-react";
import { CommentInput } from "../custom";
import { usePostComment } from "@/api/response";
import { useAuthContext } from "@/providers/AuthProvider";
// import { useState } from "react";

interface ResponseDetailsProps {
  report: ReportData;
}

export default function ResponseDetails({ report }: ResponseDetailsProps) {
  const { mutate, isLoading, isSuccess } = usePostComment();
  const { isLoggedIn, logout } = useAuthContext();
  // const [defaultVaule, setDefaultValue] = useState("Hoola my nigga");

  const handleSend = (data: { content: string }) => {
    if (isLoggedIn) {
      mutate({ ...data, report_id: report.id.toString() });
    } else {
      // localStorage.setItem( 'temporary-comment',  data.content);
      logout();
    }
  };
  return (
    <div>
      <h3 className="mb-2 text-text">{report.title}</h3>
      <div className="flex flex-col items-center gap-1 text-sm md:flex-row">
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

      <div className="my-5 text-text">
        <p className="leading-7">{report.description}</p>
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
            handleSend={(data) => handleSend(data)}
            placeholder="Type your comment here"
            isSent={isSuccess}
            // defaultValue={defaultVaule}
          />
        </div>
      </div>
    </div>
  );
}
