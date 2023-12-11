import { Location } from "iconsax-react";

export default function ResponseActivity() {
  return (
    <div className=" rounded-[40px] bg-white w-[288px] ">
      <img
        src="/images/activity.png"
        className="h-[147px] object-cover rounded-t-[20px]"
        alt=""
      />

      <div className="px-4 py-3">
        <div className="flex justify-between gap-5">
          <p className="font-semibold text-dark ">
            Upgrade of the International Airport
          </p>

          <p className="text-[10px] w-full whitespace-nowrap flex-1 ml-auto">
            2h ago
          </p>
        </div>

        <div className="mt-2 mb-4 text-sm text-subtle_text">
          Soludo upgrades the international airport, increasing its hanger
          capacity and the tarmac
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Location size={14} />
          Umuleri, Anambra State
        </div>
      </div>
    </div>
  );
}
