import { Button } from "@/components/ui/button";
import { DocumentCopy } from "iconsax-react";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

interface ShareProps {
  shareableURL: string;
}
const Share: React.FC<ShareProps> = ({ shareableURL }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableURL);
    setCopied(true);
  };

  return (
    <div>
      <div className="flex justify-start items-start gap-8">
        <h2 className="pb-2  border-b-4 text-[18px] font-medium border-primary w-fit">
          Share
        </h2>

        <Button
          className="bg-transparent p-0 w-fit hover:bg-transparent text-dark text-[14px] flex justify-center  gap-1"
          onClick={handleCopyLink}
        >
          <DocumentCopy size={20} />
          <span>Copy link</span>
          {copied && <p className=" text-sm text-primary">Copied</p>}
        </Button>
      </div>

      <div className="flex gap-2 my-4">
        <FacebookShareButton url={shareableURL}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <WhatsappShareButton url={shareableURL}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <RedditShareButton url={shareableURL}>
          <RedditIcon size={40} round />
        </RedditShareButton>
        <EmailShareButton url={shareableURL}>
          <EmailIcon round size={40} />
        </EmailShareButton>
        <TwitterShareButton url={shareableURL}>
          <TwitterIcon round size={40} />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default Share;
