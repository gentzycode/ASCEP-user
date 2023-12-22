import { useGetDebateInfo } from "@/api/democracy/debates";
import {
  DebateComments,
  DebateInfo,
  RelatedDebates,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Danger } from "iconsax-react";
import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface DebatesInfoPageProps {}
const DebatesInfoPage: React.FC<DebatesInfoPageProps> = () => {
  const { debateId } = useParams();
  const {
    data: debate,
    isError,
    isLoading: isLoadingDebate,
  } = useGetDebateInfo(parseInt(debateId!));

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {/* LOADING */}
      <div className="w-full flex justify-center">
        {isLoadingDebate && (
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        )}
      </div>

      {/* ERROR */}
      {isError && (
        <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">No Debate Found</p>
          </div>
        </div>
      )}

      {/* DEBATE INFO */}
      {debate && (
        <div className="pt-10">
          <DebateInfo debate={debate} scrollToComments={scrollToComments} />
        </div>
      )}

      {/* RELATED CONTENT */}
      {/* <div className="my-10 w-full max-w-[700px]">
          <RelatedDebates />
        </div> */}
        
      {/*COMMENTS */}
      <div
        className="my-10 w-full max-w-[700px]"
        id="comments"
        ref={commentsSectionRef}
      >
        <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Comments
        </h2>

        <div className="flex gap-10 flex-col mt-10">
          {debate && <DebateComments />}
        </div>
      </div>
    </>
  );
};
export default DebatesInfoPage;
