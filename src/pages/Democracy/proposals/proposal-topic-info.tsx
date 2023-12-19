import DemocracyLayout from "@/layouts/DemocracyLayout";
import { useParams } from "react-router-dom";

interface ProposalTopicInfoPageProps {}
const ProposalTopicInfoPage: React.FC<ProposalTopicInfoPageProps> = () => {
    const {topicId} = useParams()
  return (
    <DemocracyLayout>
      <h1>{topicId}</h1>
    </DemocracyLayout>
  );
};
export default ProposalTopicInfoPage;
