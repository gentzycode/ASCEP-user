import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeadingProp {}
const Heading: React.FC<HeadingProp> = () => {
  return (
    <div>
      <h1 className="text-text text-3xl md:text-6xl">
        Get answers from the government and public sector
      </h1>
      <p className="text-subtle_text py-8 text-xl xl:text-2xl">
        Make a request for information to a public authority: by law, they have
        to respond
      </p>
      <div className="flex items-center gap-2 flex-wrap text-xl md:text-2xl">
        <Button className="h-11 text-dark text-base">Make a request</Button>
        <p className="text-text text-xl xl:text-2xl">
          or Browse{" "}
          <Link to="#" className="text-primary">
            1,006,241 requests{" "}
          </Link>
          to <span className="text-royal_blue">46,398 authorities</span>
        </p>
      </div>
    </div>
  );
};

export default Heading;
