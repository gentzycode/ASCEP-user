import { Button } from "@/components/ui/button";
import { DocumentCopy, Facebook, Whatsapp } from "iconsax-react";
import { Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

interface ShareProps {
  shareableId: string;
}
const Share: React.FC<ShareProps> = ({ shareableId }) => {
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
    navigator.clipboard.writeText(shareableId);
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
        <Link
          to={`whatsapp://send?text= ${shareableId}`}
          rel="nofollow noopener"
          target="_blank"
          className="text-subtle_text"
        >
          <Whatsapp size={35} variant="Bold" />
        </Link>
        <Link to="#" className=" text-subtle_text">
          <Facebook size={35} variant="Bold" />
        </Link>
        <Link to="#" className=" text-subtle_text">
          <Twitter size={35} />
        </Link>
        <Link to="#" className=" text-subtle_text">
          <MdEmail size={35} />
        </Link>
        <Link to="#" className=" text-subtle_text">
          <FaReddit size={35} />
        </Link>
      </div>
      
    </div>
  );
};

export default Share;
