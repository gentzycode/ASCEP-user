import {
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchAuthoritiesList,
} from "@/components/Dialogue";

interface MakeARequestHomePageProp {}
const MakeARequestHomePage: React.FC<MakeARequestHomePageProp> = () => {
  return (
    <div className="max-w-[900px] mt-11">
      <MakeARequestHeading />
      <SearchAuthoritiesList />
      <MakeRequestPageFooter />
    </div>
  );
};

export default MakeARequestHomePage;
