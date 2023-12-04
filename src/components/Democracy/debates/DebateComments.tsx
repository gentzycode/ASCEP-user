import { useState } from "react";
import { DebateCommentCard, FilterButtons } from "..";
import { debateFilterOptions } from "@/utils/Democracy/Debates";
interface DebateCommentsCardProps {}
const DebateComments: React.FC<DebateCommentsCardProps> = () => {
  const [filterOption, setFilterOption] = useState<string>("Most active");
  return (
    <>
      <FilterButtons
        filterOptions={debateFilterOptions}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <DebateCommentCard />
      <DebateCommentCard />
      <DebateCommentCard />
    </>
  );
};
export default DebateComments;
