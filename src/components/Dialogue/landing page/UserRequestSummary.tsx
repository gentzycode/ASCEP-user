import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface UserRequestSummaryProp {}
const UserRequestSummary: React.FC<UserRequestSummaryProp> = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <p className="text-text text-base md:text-lg">
              <span className="text-royal_blue">Ministry of Health</span>{" "}
              answered a request about{" "}
              <span className="text-primary">Health Problems</span>
            </p>
            <p className="text-dark py-1">About 17 hours ago</p>
            <Separator className="h-[2px] " />
          </div>
        ))}
      </div>
      <Button className="h-12 w-full max-w-[200px] text-dark my-6">
        Browse all requests
      </Button>
    </div>
  );
};

export default UserRequestSummary;
