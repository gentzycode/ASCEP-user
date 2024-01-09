import { useGetDebateInfo } from "@/api/democracy/debates";
import {
  DebateCommentSection,
  DebateInfo,
  NotFound,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import { useRef } from "react";
import { useParams } from "react-router-dom";

interface DebatesInfoPageProps {}
const DebatesInfoPage: React.FC<DebatesInfoPageProps> = () => {
  const { debateId } = useParams();
  const {
    data: debate,
    isError,
    isLoading: isLoadingDebate,
  } = useGetDebateInfo(debateId!);

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* LOADING */}
      <div className="w-full flex justify-center">
        {isLoadingDebate && <PageLoader />}
      </div>

      {/* ERROR */}
      {isError && !debate && <NotFound message="Debate not found" />}

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

      {/* COMMENT SECTION */}
      <div ref={commentsSectionRef} className="max-w-[900px] mt-10">
        <DebateCommentSection />
      </div>
    </>
  );
};
export default DebatesInfoPage;
