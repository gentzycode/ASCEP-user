import { IconWrapper } from "../custom";
import { Profile2User } from "iconsax-react";

export default function Recommendation() {
  return (
    <div className="bg-white rounded-[40px] p-6 flex items-center">
      <div className="flex-1">
        <IconWrapper className="h-[50px] w-[50px]">
          <Profile2User />
        </IconWrapper>
      </div>
      <div className="ml-[18px] mr-11">
        <p className="text-xl font-semibold mb-[14px] ">
          Request for Public Records
        </p>
        <p className="flex gap-1 mb-[10px]">
          <span className="font-medium text-link">David Ubaka</span> sent this
          request to the{" "}
          <span className="font-medium text-link">
            Chicago Department of Public Health
          </span>{" "}
          on Oct 28, 2023
        </p>

        <p className="text-sm font-medium text-subtle_text">
          I am writing to request access to the following public records under
          the Freedom of Information Act. [Specify the documents or information
          you're seeking, e.g., meeting minutes, financial reports, emails,
          etc.]. Please provide these records in an electronic format if
          possible. Thank you.
        </p>
      </div>

      <div className="px-10 py-1 text-green-700 rounded-full bg-green-700/10">
        Successful
      </div>
    </div>
  );
}
