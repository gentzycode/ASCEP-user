import { DataTable } from "@/components/custom/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "iconsax-react";
import { EditQuestionButton } from "..";

interface QuestionTableProp {
  questions: VotingQuestionsType[];
}

const QuestionTable: React.FC<QuestionTableProp> = ({ questions }) => {
  const columns: ColumnDef<VotingQuestionsType>[] = [
    {
      accessorKey: "question",
      header: () => <div className="text-left text-dark">Title</div>,
      cell: ({ row }) => {
        const qst = row.getValue("question") as string;
        return <div className="text-left text-text">{qst}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right text-dark">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-4">
            <EditQuestionButton question={row.original} />
            <Trash size={25} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-6">
      <DataTable columns={columns} data={questions} />
    </div>
  );
};

export default QuestionTable;
