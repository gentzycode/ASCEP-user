import {
  InvestmentCommentSection,
  InvestmentInfo,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import useScrollToComments from "@/hooks/useScrollToComments";

const InvestmentInfoPage = () => {
  const { commentsSectionRef, scrollToComments } = useScrollToComments();

  const isLoading = false;
  return (
    <div>
      {/* LOADING */}
      {isLoading && <PageLoader />}

      <InvestmentInfo scrollToComments={scrollToComments} />

      {/* COMMENT SECTION */}
      <div ref={commentsSectionRef} className="max-w-[900px] mt-10">
        <InvestmentCommentSection />
      </div>
    </div>
  );
};

export default InvestmentInfoPage;
