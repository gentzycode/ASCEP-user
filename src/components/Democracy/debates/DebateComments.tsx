import { useState } from "react";
import { DebateCommentCard, FilterButtons } from "..";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import { IconWrapper } from "@/components/custom";
import { CloseCircle, Danger } from "iconsax-react";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { Button } from "@/components/ui/button";
interface DebateCommentsCardProps {}
const DebateComments: React.FC<DebateCommentsCardProps> = () => {
  const [filterOption, setFilterOption] = useState<string>("Most active");
  return (
    <>
      <FilterButtons
        filterButtonOptions={debateFilterButtonOptions}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      <div className="flex items-center justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10">
        <div className="flex justify-start items-center gap-1">
          <IconWrapper className="text-primary rounded-full">
            <Danger size="32" />
          </IconWrapper>
          <p className="text-[16px]">
            You must{" "}
            <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
              sign in
            </Link>{" "}
            or{" "}
            <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
              sign up
            </Link>{" "}
            to leave a comment.
          </p>
        </div>
        <Button className="bg-transparent hover:bg-transparent w-fit h-fit">
          <CloseCircle size="32" />
        </Button>
      </div>
      <DebateCommentCard />
      <DebateCommentCard />
      <DebateCommentCard />
    </>
  );
};
export default DebateComments;
