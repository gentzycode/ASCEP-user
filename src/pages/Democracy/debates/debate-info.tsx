import {
  DebateComments,
  DebateInfo,
  RelatedDebates,
} from "@/components/Democracy";
import DemocracyLayout from "@/layouts/DemocracyLayout";

interface DebatesInfoPageProps {}
const DebatesInfoPage: React.FC<DebatesInfoPageProps> = () => {
  return (
    <DemocracyLayout>
      {/* DEBATE INFO */}
      <div>
        <DebateInfo />
      </div>
      {/* RELATED CONTENT */}
      <div className="my-20 w-full max-w-[700px]">
        <RelatedDebates />
      </div>
      {/*COMMENTS */}
      <div className="my-20 w-full max-w-[700px]">
        <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Comments
        </h2>
        <div className="flex gap-10 flex-col mt-10">
          <DebateComments />
        </div>
      </div>
    </DemocracyLayout>
  );
};
export default DebatesInfoPage;
