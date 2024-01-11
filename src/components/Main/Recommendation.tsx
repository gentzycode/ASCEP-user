import { IconWrapper } from "../custom";
import { Profile2User } from "iconsax-react";

export default function Recommendation() {
  return (
    <div className="bg-white rounded-[40px] p-3 py-6 md:p-6 flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex items-center flex-1 gap-2">
        <IconWrapper className="h-10 md:h-[50px] w-10 md:w-[50px] ">
          <Profile2User className="w-5 md:w-8" />
        </IconWrapper>
        <p className="inline-block text-xl font-semibold lg:hidden ">
          Request for Public Records
        </p>
      </div>
      <div className="md:ml-[18px] md:mr-11">
        <p className="text-xl hidden lg:inline-block font-semibold mb-[14px] ">
          Request for Public Records
        </p>
        <p className="flex gap-1 mb-[10px] flex-wrap">
          <span className="font-medium text-link">David Ubaka</span> sent this
          request to the{" "}
          <span className="font-medium text-link">
            Chicago Department of Public Health
          </span>{" "}
          on Oct 28, 2023
        </p>

        <p className="text-sm font-medium text-subtle_text line-clamp-3">
          I am writing to request access to the following public records under
          the Freedom of Information Act. [Specify the documents or information
          you're seeking, e.g., meeting minutes, financial reports, emails,
          etc.]. Please provide these records in an electronic format if
          possible. Thank you.
        </p>
      </div>

      <div className="px-6 py-1 ml-auto text-sm text-green-700 rounded-full md:px-10 md:text-base w-fit bg-green-700/10">
        Successful
      </div>
    </div>
  );
}
