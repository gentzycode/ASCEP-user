import { useGetDebateInfo } from "@/api/democracy/debates";
import {
  DebateComments,
  DebateInfo,
  RelatedDebates,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface DebatesInfoPageProps {}
const DebatesInfoPage: React.FC<DebatesInfoPageProps> = () => {
  const { debateId } = useParams();
  const {
    data: debate,
    isError,
    error,
    isLoading: isLoadingDebate,
  } = useGetDebateInfo(parseInt(debateId!));

  return (
    <DemocracyLayout>
      <div className="w-full flex justify-center">
        {isLoadingDebate && (
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        )}
      </div>
      {isError && <p>{JSON.stringify(error)}</p>}
      <>
        {/* DEBATE INFO */}
        {debate && (
          <div>
            <DebateInfo debate={debate} />
          </div>
        )}
        {/* RELATED CONTENT */}
        <div className="my-10 w-full max-w-[700px]">
          <RelatedDebates />
        </div>
        {/*COMMENTS */}
        <div className="my-10 w-full max-w-[700px]">
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Comments
          </h2>

          <div className="flex gap-10 flex-col mt-10">
            <DebateComments debate={debate} />
          </div>
        </div>
      </>
    </DemocracyLayout>
  );
};
export default DebatesInfoPage;
