import { useGetAuthoritiesAndRequestCount } from "@/api/dialogue/requests";
import { UserRequestSummary } from "@/components/Dialogue";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FreedomOfInformationProp {}
const FreedomOfInformation: React.FC<FreedomOfInformationProp> = () => {
  const { data } = useGetAuthoritiesAndRequestCount();
  return (
    <div className="mt-16">
      {/* USER REQUEST */}
      <div>
        <h2 className="text-text text-3xl xl:text-4xl">
          What information has been released?
        </h2>
        <p className="text-subtle_text py-4 text-xl xl:text-2xl">
          Users have made {data?.totalRequests} requests, including:
        </p>
        <UserRequestSummary />
      </div>
      {/* FREEDOM OF INFORMATION */}
      <div className="mt-16">
        <h2 className="text-text text-3xl xl:text-4xl">
          What is Freedom of Information?
        </h2>
        <p className="text-subtle_text py-4 text-xl xl:text-2xl">
          The Freedom of Information Act, also known as FOI gives you the right
          to{" "}
          <Link to="#" className="text-primary underline">
            request recorded information
          </Link>{" "}
          from public authorities. As well as documents and emails, it also
          covers things like spreadsheets, presentations, maps, videos and
          photographs.
        </p>
        <p className="text-subtle_text py-4 text-xl xl:text-2xl">
          By law requests have to be answered promptly and within{" "}
          <Link to="#" className="text-primary underline">
            20 working days.
          </Link>{" "}
          In most cases information should be released, but various{" "}
          <Link to="#" className="text-primary underline">
            exemptions
          </Link>
          allow authorities to withhold information.
        </p>

        <Button className="h-12 w-full max-w-[200px] text-dark my-6">
          Learn more About FOI
        </Button>
      </div>
    </div>
  );
};

export default FreedomOfInformation;
