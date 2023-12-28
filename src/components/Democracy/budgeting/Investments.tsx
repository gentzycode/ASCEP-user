import { InvestmentCard } from "..";

interface InvestmentsProp {}
const Investments: React.FC<InvestmentsProp> = () => {
  return (
    <div className="my-14">
      <h2 className="text-text text-2xl md:text-4xl py-8">List of Investments</h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 ">
        <InvestmentCard />
        <InvestmentCard />
        <InvestmentCard />
        <InvestmentCard />
      </div>
    </div>
  );
};

export default Investments;
