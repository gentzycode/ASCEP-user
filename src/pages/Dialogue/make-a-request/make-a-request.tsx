import {
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchRequestList,
} from "@/components/Dialogue";

interface MakeARequestHomePageProp {}
const MakeARequestHomePage: React.FC<MakeARequestHomePageProp> = () => {
  return (
    <div className="max-w-[900px] mt-11">
      <MakeARequestHeading />
      <SearchRequestList />
      <MakeRequestPageFooter />
    </div>
  );
};

export default MakeARequestHomePage;
