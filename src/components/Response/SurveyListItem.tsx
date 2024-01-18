import { Location } from "iconsax-react";
import { Link } from "react-router-dom";

interface SurveyListItemProps {
  survey: SurveyListItemType;
}

export default function SurveyListItem({ survey }: SurveyListItemProps) {
  return (
    <Link to={`/response/surveys/${survey.id}`}>
      <div className="flex gap-3 h-[160px] ">
        {/* <img
          src={"/images/activity.png"}
          className="hidden md:block w-full max-w-20 md:max-w-[165px] rounded-[20px]  object-cover "
          alt=""
        /> */}

        <div className="md:py-6 md:px-[18px]  p-3 bg-white w-full rounded-xl md:rounded-[20px] space-y-3  ">
          <div className="flex items-center gap-3">
            <h4 className="text-base font-semibold md:text-xl">
              {survey.title}
            </h4>

            {/* <div
              className={` py-1 px-2 md:px-5 text-xs md:text-base rounded-full ${
                survey.reportStatus.name === "Public"
                  ? "text-[#31D0AA] bg-[#31D0AA]/10"
                  : "text-[#2F80ED] bg-[#2F80ED]/10"
              } `}
            >
              {survey.reportStatus.name}
            </div> */}
          </div>

          <div className="items-center gap-2 text-xs font-medium md:text-sm md:flex text-dark">
            <div className="flex items-center gap-2">
              <Location color="black" size={16} />

              <p className="capitalize">{survey.location_meta}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-link">Posted on</p>

              <p>{new Date(survey.createdAt).toDateString()}</p>
            </div>
          </div>

          <p className="text-sm line-clamp-2 md:line-clamp-2 xl:line-clamp-2 text-subtle_text ">
            {survey.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
