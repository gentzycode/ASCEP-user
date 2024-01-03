import { RequestListCard } from "@/components/Dialogue";

interface RequestListProp {}
const RequestList: React.FC<RequestListProp> = () => {
  return (
    <div className="space-y-8 my-16">
      <RequestListCard />
      <RequestListCard />
      <RequestListCard />
      <RequestListCard />
      <RequestListCard />
      <RequestListCard />
    </div>
  );
};

export default RequestList;
