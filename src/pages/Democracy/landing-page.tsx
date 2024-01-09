import { FAQ, Hero, SubModules } from "@/components/Democracy";

interface DemocracyLandingPageProp {}
const DemocracyLandingePage: React.FC<DemocracyLandingPageProp> = () => {
  return (
    <div className="">
      <Hero />
        <div className="w-full relative px-3 min-[600px]:px-6 py-10 max-w-[900px]">
        <SubModules />
        <FAQ />
      </div>
    </div>
  );
};

export default DemocracyLandingePage;
