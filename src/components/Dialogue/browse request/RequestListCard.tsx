import { RequestInfoHeader } from "@/components/Dialogue";

interface RequestListCardProp {
  request: RequestType;
}
const RequestListCard: React.FC<RequestListCardProp> = ({ request }) => {
  const { description } = request;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RequestInfoHeader request={request} />
      <div>
        {/* <div className="text-14px text-transparent max-h-[65px] pb-5 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden"> */}
        <p className="text-text text-base lg:text-lg">
          {description.slice(0, 200)}....
        </p>
      </div>
    </div>
  );
};

export default RequestListCard;
