import { useGetAllProposals } from "@/api/democracy/proposals";
import { PageLoader } from "@/components/custom";
import { DataTable } from "@/components/custom/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { NotFound, Pagination } from "..";
import { useEffect, useState } from "react";
import { formattedDate } from "@/utils/helper";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useLinkProposal } from "@/api/democracy/voting";
import { useParams } from "react-router-dom";

interface ProposalsTabProp {
  proposals: ProposalType[];
}
const ProposalsTab: React.FC<ProposalsTabProp> = ({ proposals }) => {
  const { pollId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);

  const [selectedProposal, setSelectedProposal] = useState<ProposalType[]>(
    proposals ?? []
  );

  const {
    mutate: getAllProposals,
    isLoading: fetchingProposals,
    isError: fetchingProposalError,
    data: fetchedProposalData,
  } = useGetAllProposals();

  const { mutateAsync: linkProposals, isLoading: isLinkingProposals } =
    useLinkProposal();

  const handleSave = async () => {
    const proposalIds = selectedProposal.map((proposal) => proposal.id);
    await linkProposals({ proposals: proposalIds, voting_id: pollId! });
  };

  useEffect(() => {
    getAllProposals({ page, perPage, filter: { newest: true } });
  }, []);

  const columns: ColumnDef<ProposalType>[] = [
    {
      id: "select",
      header: () => <div className="text-left text-dark">Select</div>,
      cell: ({ row }) => (
        <Checkbox
          // checked={selectedProposal.includes(row.original)}
          checked={
            !!selectedProposal.find(
              (proposal) => proposal.id === row.original.id
            )
          }
          onCheckedChange={(value: boolean) => {
            if (value) {
              setSelectedProposal((proposal) => [...proposal, row.original]);
            } else {
              setSelectedProposal((proposal) =>
                proposal.filter((prop) => prop !== row.original)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="border border-text"
          disabled={
            selectedProposal.length === 2 &&
            !selectedProposal.includes(row.original)
          }
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div
          className="text-left text-dark cursor-pointer flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const date = formattedDate(row.getValue("createdAt"));
        return <div className="text-left text-text">{date}</div>;
      },
    },
    {
      accessorKey: "title",
      header: () => <div className="text-left text-dark">Title</div>,
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        return <div className="text-left text-text">{title}</div>;
      },
    },
    {
      accessorKey: "author",
      header: () => <div className="text-left text-dark">Author</div>,
      cell: ({ row }) => {
        const author = row.getValue("author") as ProposalAuthorType;
        return <div className="text-left text-text">{author.username}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left text-dark">Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <div className="text-left text-text">{status}</div>;
      },
    },
  ];
  const removeProposal = (proposalId: string) => {
    setSelectedProposal((proposals) =>
      proposals.filter((proposal) => proposal.id !== proposalId)
    );
  };

  return (
    <div>
      <h2 className="text-text text-base md:text-xl py-5">
        Select Proposal{" "}
        <span className="text-sm text-red-500">*must select two proposal*</span>
      </h2>

      <h1 className="text-base text-text py-4 underline">
        Selected proposals ({selectedProposal.length})
      </h1>
      {selectedProposal && (
        <>
          <div className="flex flex-col gap-2">
            {selectedProposal.map((proposal) => (
              <div
                key={proposal.id}
                className=" top-0 left-0 flex h-full gap-1 py-3 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit"
              >
                <span>{proposal.title}</span>
                <IoClose
                  className="text-base cursor-pointer"
                  onClick={() => removeProposal(proposal.id)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* LOADING */}
      {fetchingProposals && <PageLoader />}

      {/* ERROR */}
      {fetchingProposalError && !fetchingProposals && !fetchedProposalData && (
        <NotFound message="No Proposals Found" />
      )}
      {fetchedProposalData && (
        <div className="my-6">
          <DataTable columns={columns} data={fetchedProposalData?.proposals!} />
          <Pagination
            onPageChange={getAllProposals}
            perPage={perPage}
            setPage={setPage}
            filterOptions={{ newest: true }}
            meta={fetchedProposalData?.meta}
          />
          <Button
            className="h-12 text-dark rounded-xl w-full max-w-[200px] my-4"
            onClick={handleSave}
            disabled={selectedProposal.length < 2 || isLinkingProposals}
            isLoading={isLinkingProposals}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProposalsTab;
