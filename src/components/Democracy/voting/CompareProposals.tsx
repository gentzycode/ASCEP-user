import { VotingProposalInfo } from "..";

interface CompareProposalProp {
  proposals: VotingProposalType[];
}

const CompareProposals: React.FC<CompareProposalProp> = ({ proposals }) => {
  return (
    <div className="py-20 grid min-[1000px]:grid-cols-2 gap-16">
      {proposals.map((proposal) => (
        <VotingProposalInfo proposal={proposal} key={proposal.id} />
      ))}
    </div>
  );
};

export default CompareProposals;
