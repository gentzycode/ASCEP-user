interface PreviousBudgetProps {}
const PreviousBudget: React.FC<PreviousBudgetProps> = () => {
  return (
    <div className="space-y-14">
      <h2 className="text-text xl:text-5xl text-2xl">Previous Budgets</h2>
      <div className="space-y-14">
        <PreviousBudgetCard />
        <PreviousBudgetCard />
        <PreviousBudgetCard />
      </div>
    </div>
  );
};

export default PreviousBudget;

interface PreviousBudgetCardProps {}
export const PreviousBudgetCard: React.FC<PreviousBudgetCardProps> = () => {
  const approved = false;
  return (
    <div className="space-y-2">
      <h3 className="text-text text-2xl lg:text-4xl">
        Participatory budgeting 2024
      </h3>
      <p className="text-sm lg:text-base text-subtitle_text py-2">
        <span className="text-primary">Finished Projects</span> December 26,
        2023 - January 25, 2024
      </p>
      {approved ? (
        <p className="text-[#27AE60] bg-[#27AE60]/10 text-xs inline px-3 py-2 rounded-xl capitalize font-bold">
          approved
        </p>
      ) : (
        <p className="text-[#E43F40] bg-[#E43F40]/10 capitalize text-xs inline px-3 py-2 rounded-xl font-bold">
          approved
        </p>
      )}
    </div>
  );
};
