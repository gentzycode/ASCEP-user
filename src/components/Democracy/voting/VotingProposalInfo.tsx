import { Button } from "@/components/ui/button";
import { Copy, PlayCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useEffect, useState } from "react";
import { DisplayDocuments } from "..";

interface VotingProposalInfoProps {
  proposal: VotingProposalType;
}

const VotingProposalInfo: React.FC<VotingProposalInfoProps> = ({
  proposal,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(proposal.external_video_url);
    setCopied(true);
  };

  const {
    title,
    descriptive_image,
    external_video_url,
    id,
    proposalDocuments,
    proposal_code,
    summary,
  } = proposal;
  return (
    <div className="grid gap-8">
      {/* MAIN INFO */}
      <h1 className="text-[20px] text-dark">{title}</h1>
      <div className="text-14px text-transparent max-h-[100px]  bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden">
        <p className="text-sm md:text-base">{summary}</p>
      </div>

      {/* LINK TO PROPOSAL INFO */}
      <Link
        to={ROUTES.PROPOSAL_INFO_ROUTE(id)}
        className="text-primary hover:underline text-base"
      >
        Read more on proposal
      </Link>

      {/* IMAGE */}
      {descriptive_image && (
        <div
          className="w-full relative h-[200px] lg:h-[400px] rounded-2xl 
        overflow-hidden max-w-[600px]"
        >
          <img
            src={descriptive_image}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* DOCUMENT */}
      <div className="">
        {proposalDocuments.length !== 0 && (
          <>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit mb-8">
              Documents ({proposalDocuments.length})
            </h2>
            <div className="flex gap-4 flex-wrap">
              {proposalDocuments.map((doc, i) => (
                <DisplayDocuments doc={doc} key={i} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* VIDEO */}
      {external_video_url && (
        <div className="px-2 py-4 max-w-[700px] flex-wrap bg-light border border-primary rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={external_video_url}
              target="_blank"
              className="text-primary"
            >
              <PlayCircle size="40" variant="Bold" />
            </Link>
            <div>
              <h3 className="text-sm">External video link</h3>
              <p className="text-sm whitespace-normal">{external_video_url}</p>
            </div>
          </div>
          <Button className="w-fit h-fit relative p-0 bg-transparent hover:bg-transparent">
            <Copy
              size="25"
              color="#292925"
              variant="Bold"
              onClick={handleCopyLink}
              className="cursor-pointer"
            />
            {copied && (
              <p className="absolute -left-12 text-sm text-primary">Copied</p>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
export default VotingProposalInfo;
