import { RequestInfoHeader } from "@/components/Dialogue";

interface RequestListCardProp {}
const RequestListCard: React.FC<RequestListCardProp> = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RequestInfoHeader />
      <div>
        <p className="text-text text-base lg:text-lg">
          MICFRS 15/12/23: Police must apply safeguards and improve scrutiny to
          minimize harm when using stop and search 'A police super-complaint*
          submit....
        </p>
      </div>
    </div>
  );
};

export default RequestListCard;
