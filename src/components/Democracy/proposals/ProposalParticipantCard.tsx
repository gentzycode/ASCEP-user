import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProposalParticipantCardProps {
  member: ProposalCommunityMemberType;
}
const ProposalParticipantCard: React.FC<ProposalParticipantCardProps> = ({
  member,
}) => {
  const { creator, user_id } = member;
  return (
    <div className="flex gap-2">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={creator.profile_picture ? creator.profile_picture : undefined}
        />
        <AvatarFallback className="uppercase font-[700]">
          {/* {creator.firstname.slice(0, 2)} */}
          AA
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-start flex-col">
        <h2 className="text-dark text-[14px]">
          {creator.firstname ?? "MOH"}
        </h2>
        <h5 className="text-sm text-subtle_text">Participant</h5>
      </div>
    </div>
  );
};

export default ProposalParticipantCard;
