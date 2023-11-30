import { ListViewIcon } from "@/Icons";
import { Button } from "@/components/ui/button";
import DemocracyLayout from "@/layouts/DemocracyLayout";

interface ProposalsProps {}
const Proposals: React.FC<ProposalsProps> = () => {
  return (
    <DemocracyLayout>
      <div className="px-10  max-w-[860px] mx-auto  text-center">
        <h1 className="tracking-[1px]  text-center font-sans text-dark text-[30px] md:text-[60px]">
          Proposals
        </h1>
        <p className="text-[24px] text-subtle_text my-6">
          Citizens' proposals are an opportunity for neighbours and collectives
          to decide directly how they want their city to be, after getting
          sufficient support and submitting to a citizens' vote.
        </p>

        <div className="flex justify-center items-center gap-8 flex-col md:flex-row">
          <Button className="w-[175px]">Get started</Button>
          <Button className="bg-transparent border-dark border-2 w-[175px]">
            Log in
          </Button>
        </div>

        <div className="mt-14 flex justify-start gap-[16px]">
          <button className="flex items-center text-[14px] gap-[6px] border-light_grey border-2 px-4 py-2" >
            <ListViewIcon />
            <span>List View</span>
          </button>
          <h4>Advanced Search</h4>
        </div>
      </div>
    </DemocracyLayout>
  );
};
export default Proposals;
