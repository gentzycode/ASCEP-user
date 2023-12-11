import { Location } from "iconsax-react";
import { CommentInput } from "../custom";

export default function ResponseDetails() {
  return (
    <div>
      <h3>Upgrade of the International Airport</h3>
      <div className="flex items-center gap-1 text-sm">
        <Location color="black" size={14} />
        <p>Umuleri, Anambra State</p>
        <p className="font-bold text-link">Posted by</p>
        <p>David Olaniyi on Oct 28, 2023/</p>
      </div>

      <div className="my-5 font-medium text-dark">
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. "Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat."Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat."Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>

        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat."Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat."Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="flex gap-6">
        <img src="/images/SDG/image 19.png" alt="" />
        <img src="/images/SDG/image 20.png" alt="" />
        <img src="/images/SDG/image 21.png" alt="" />
        <img src="/images/SDG/image 22.png" alt="" />
        <img src="/images/SDG/image 23.png" alt="" />
      </div>

      <div className="h-[210px] bg-cover relative my-5 shadow-sm rounded-[40px] ">
        <img src="/images/anambra.png" className="object-fill" alt="" />

        <div className="absolute w-full px-20 bottom-10 ">
          <CommentInput placeholder="Type your comment here" />
        </div>
      </div>
    </div>
  );
}
