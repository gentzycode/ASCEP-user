import { BudgetProjectTable, FormSelectWard } from "..";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import { ColumnDef } from "@tanstack/react-table";
import PaginationComponent from "@/components/custom/Pagination";

const ReviewingVotes = () => {
  const form = useForm({
    // resolver: zodResolver(startDebateSchema),
    defaultValues: {
      title: "",
      description: "",
      sdgs: [],
      targets: [],
      tags: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startDebateSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-text lg:text-5xl text-2xl ">Vote Metrics</h2>
        <p className="md:text-2xl text-xl text-text">
          Estimated overall Valuation:{" "}
          <span className="text-subtitle_text">₦ 600,000,000</span>
        </p>
        <p className="md:text-2xl text-xl text-text">
          Total investments:{" "}
          <span className="text-subtitle_text">5000 Investments</span>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[600px] my-6 space-y-6"
        >
          <FormSelectWard
            label="Ward"
            name="ward"
            // @ts-ignore
            errors={errors}
            // @ts-ignore
            control={control}
          />
        </form>
      </Form>

      <ProjectTable />
    </div>
  );
};

export default ReviewingVotes;

interface QuestionTableProp {
  // questions: VotingQuestionsType[];
}

const ProjectTable: React.FC<QuestionTableProp> = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: () => <div className="text-left text-dark font-bold">Title</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-text font-bold">
            Project name can be long sha
          </div>
        );
      },
    },
    {
      accessorKey: "ward",
      header: () => <div className="text-center text-dark font-bold">Ward</div>,
      cell: ({ row }) => {
        return <div className="text-center text-text">ward</div>;
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-center text-dark font-bold">Amount</div>,
      cell: ({ row }) => {
        return <div className="text-center text-text">₦60, 000</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center text-dark font-bold">For</div>,
      cell: ({ row }) => {
        return (
          <div className="rounded-2xl w-14 h-14 mx-auto text-[#27AE60] bg-[#27AE60]/10 flex justify-center items-center">
            <p>50%</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-center text-dark font-bold">Against</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-[#E43F40] bg-[#E43F40]/10 rounded-2xl w-14 h-14 mx-auto flex justify-center items-center">
            <p>83%</p>
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-10 space-y-10">
      <BudgetProjectTable columns={columns} data={Array.from({ length: 6 })} />
      <PaginationComponent
        page={1}
        setPage={() => {}}
        isFetching={false}
        paginationData={{
          total: 3,
          per_page: 10,
          current_page: 1,
          last_page: 1,
          first_page: 1,
          first_page_url: "/?page=1",
          last_page_url: "/?page=1",
          next_page_url: null,
          previous_page_url: null,
        }}
      />
    </div>
  );
};
