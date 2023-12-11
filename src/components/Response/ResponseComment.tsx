import { AddSquare } from "iconsax-react";
import { useState } from "react";
import { CommentInput } from "../custom";

export default function ResponseComment() {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src="images/profile-pic.png"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <p className="text-xl font-bold text-dark">Dexter Olaniyi</p>
          </div>

          <p className="text-subtle_text">2023-10-28</p>
        </div>

        <p className="text-sm text-dark">
          I am writing to request access to the following public records under
          the Freedom of Information Act. [Specify the documents or information
          you're seeking, e.g., meeting minutes, financial reports, emails,
          etc.]. Please provide these records in an electronic format if
          possible. Thank you.
        </p>

        <div className="border-[1px] border-dark/20"></div>

        <div
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-2 font-medium cursor-pointer w-fit"
        >
          <AddSquare size="32" color="black" />

          <p>Add Response</p>
        </div>
      </div>
      {showInput && <CommentInput placeholder="Type your comment here" />}
    </div>
  );
}
