import { Location } from "iconsax-react";
import { CommentInput } from "../custom";
// import GoogleMapReact from "google-map-react";

// const defaultProps = {
//   center: {
//     lat: 10.99835602,
//     lng: 77.01502627,
//   },
//   zoom: 11,
// };

interface ResponseDetailsProps {
  report: ReportData;
}

export default function ResponseDetails({ report }: ResponseDetailsProps) {
  return (
    <div>
      <h3>{report.title}</h3>
      <div className="flex items-center gap-1 text-sm">
        <Location color="black" size={14} />
        <p>{report.location_meta}</p>
        <p className="font-bold text-link">Posted by</p>
        <p>
          {report.reporter.firstname
            ? `${report.reporter.firstname} ${report.reporter.lastname}`
            : report.reporter.username}{" "}
          on {new Date(report.createdAt).toDateString()}
        </p>
      </div>

      <div className="my-5 font-medium text-dark">
        <p>{report.description}</p>
      </div>

      <div className="flex gap-6">
        {report.reportSDGs.map((sdg) => (
          <img
            src={sdg.sdg.banner}
            className="w-16 h-16 rounded-lg"
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
        <img src="/images/anambra.png" className="object-fill" alt="" />

        <div className="absolute w-full px-20 bottom-10 ">
          <CommentInput
            isLoading={false}
            handleSend={(data) => console.log(data)}
            placeholder="Type your comment here"
          />
        </div>
      </div>
    </div>
  );
}
