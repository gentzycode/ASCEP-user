import { Location } from "iconsax-react";

export default function DataViewItem({ type }: { type: "Public" | "Private" }) {
  return (
    <div className="flex gap-3">
      <img
        src="/images/activity.png"
        className="w-[165px] rounded-[20px] h-auto object-cover "
        alt=""
      />

      <div className="py-6 px-[18px] bg-white w-full rounded-[20px] space-y-3  ">
        <div className="flex items-center gap-3">
          <h4 className="text-xl font-semibold">
            Upgrade of the International Airport
          </h4>

          <div
            className={` py-1 px-5 rounded-full ${
              type === "Public"
                ? "text-[#31D0AA] bg-[#31D0AA]/10"
                : "text-[#2F80ED] bg-[#2F80ED]/10"
            } `}
          >
            Private
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-dark">
          <Location color="black" size={16} />

          <p>Umuleri, Anambra State</p>

          <p className="font-semibold text-link">Posted By</p>

          <p>David Olaniyi on Oct 28, 2023</p>
        </div>

        <p className="text-sm text-subtle_text">
          Soludo upgrades the international airport, increasing its hanger
          capacity and the tarmac Soludo upgrades the international airport,
          increasing its hanger capacity and the tarmacSoludo upgrades the
          international airport, increasing its hanger capacity and the tarmac
        </p>
      </div>
    </div>
  );
}
