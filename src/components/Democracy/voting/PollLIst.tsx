import { PollListCard } from "..";

interface PollLIstProp {
  polls: VotingType[];
}
const PollLIst: React.FC<PollLIstProp> = ({ polls }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-10 2xl:grid-cols-3">
      {polls.map((poll) => (
        <PollListCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollLIst;
