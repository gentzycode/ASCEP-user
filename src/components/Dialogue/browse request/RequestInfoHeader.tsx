import { Button } from "@/components/ui/button";

interface RequestInfoHeaderProp {}
const RequestInfoHeader: React.FC<RequestInfoHeaderProp> = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl lg:text-2xl text-dark">
        Hospital Policy on Reasonable Adjustments under the Equality Act 2010
      </h3>
      <p className="text-base lg:text-lg text-text">
        Request to <span className="text-royal_blue">Norfolk Constabulary</span>{" "}
        by <span className="text-primary">Rachael Venables</span> . Annotated by{" "}
        <span className="text-primary">J Roberts </span> on 30 December 2023.
      </p>
      <footer className="flex gap-3">
        <Button className="h-fit w-fit text-green-500 bg-green-500/10 pointer-events-none">
          Successful
        </Button>
        <Button className="h-fit w-fit text-green-500 bg-green-500/10 pointer-events-none">
          Public
        </Button>
      </footer>
    </div>
  );
};

export default RequestInfoHeader;
