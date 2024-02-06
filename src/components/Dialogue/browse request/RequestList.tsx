import { RequestListCard } from "@/components/Dialogue";

interface RequestListProp {
  requests: RequestType[];
}
const RequestList: React.FC<RequestListProp> = ({ requests }) => {
  return (
    <div className="space-y-8 my-16">
      {requests.map((request) => (
        <RequestListCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default RequestList;
