import { Button } from "@/components/ui/button";
import DemocracyLayout from "@/layouts/DemocracyLayout";

interface DebatesProps {}
const Debates: React.FC<DebatesProps> = () => {
  return (
    <DemocracyLayout>
      <div className="px-10  max-w-[860px] mx-auto  text-center">
        <h1 className="-tracking-[3px]  text-center font-sans text-dark text-[30px] md:text-[60px]">
          Decide how to shape <br />
          <span className="text-primary">the City you want to Live in</span>
        </h1>
        <p className="text-[24px] text-subtle_text my-6">
          Vote, contribute, Initiate, build and Participate in Ideas that shape
          the future
        </p>

        <div className="flex justify-center items-center gap-8 flex-col md:flex-row">
          <Button className="w-[175px]">Get started</Button>
          <Button className="bg-transparent border-dark border-2 w-[175px]">
            Log in
          </Button>
        </div>
      </div>
    </DemocracyLayout>
  );
};
export default Debates;
