import { Link } from "react-router-dom";

interface MakeRequestInstructionProp {}
const MakeRequestInstruction: React.FC<MakeRequestInstructionProp> = () => {
  return (
    <div className="w-full max-w-[300px] space-y-6">
      <div className="space-y-3">
        <h1 className="text-xl text-dark">Before you start</h1>
        <ul className="list-none text-text space-y-2 text-base lg:text-lg">
          <li>
            Make sure the information you are asking for is not already publicly
            available.
          </li>
          <li>
            Browse{" "}
            <Link to="#" className="text-primary underline">
              other requests
            </Link>{" "}
            to 'Department for Levelling Up, Housing & Communities' for examples
            of how to word your request.
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h1 className="text-xl text-dark">Writing your request</h1>
        <ul className="list-none text-text space-y-2 text-base lg:text-lg">
          <li>
            Can I request information about myself?{" "}
            <Link to="#" className="text-primary underline">
              No
            </Link>
          </li>
          <li>Write your request in simple, precise language.</li>
          <li>
            Ask for specific documents or information, this site is not suitable
            for general enquiries.
          </li>
          <li>Keep it focused, you'll be more likely to get what you want.</li>
          <li>
            Make sure the information you are asking for is not already publicly
            available.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MakeRequestInstruction;
