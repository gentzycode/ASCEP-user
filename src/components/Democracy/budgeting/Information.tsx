import { useGetCurrentBudget } from "@/api/democracy/budgeting";
import { PageLoader } from "@/components/custom";
import { format } from "date-fns";

const Information = () => {
  const { data: currentBudget, isLoading } = useGetCurrentBudget();
  return (
    <>
      {isLoading && <PageLoader />}
      {currentBudget && (
        <div>
          <h1 className="text-text text-2xl xl:text-5xl capitalize">
            Information
          </h1>
          <h4 className="text-text text-lg xl:text-2xl py-8">Stay Tuned</h4>
          <h3 className="text-text text-2xl xl:text-5xl py-4">
            Participatory budgeting 2024
          </h3>

          <p className="text-text text-xl xl:text-2xl">
            Projects acceptance will commence in{" "}
            <span className="text-primary">
              {format(new Date(currentBudget.start_date), "MMMM dd yyy")}{" "}
            </span>{" "}
          </p>

          <p className="text-subtitle_text text-xl xl:text-2xl py-6">
            Suggest initiatives, interact with investment mappings, and
            participate in polls with deadlines. Understand the budgeting
            phases, and utilize the opportunity to suggest city-specific budget
            items that allows for localized and impactful contributions.
          </p>

          <h4 className="text-dark text-xl md:text-2xl">
            Budget Amount: #{currentBudget.total_amount}
          </h4>
        </div>
      )}
    </>
  );
};

export default Information;
