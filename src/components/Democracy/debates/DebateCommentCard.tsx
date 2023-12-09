import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddSquare, Dislike, Flag, Like1, MinusSquare } from "iconsax-react";
import { useState } from "react";

interface DebateCommentCardProps {
  comment: DebateCommentType;
}
const DebateCommentCard: React.FC<DebateCommentCardProps> = ({ comment }) => {
  const [showResponse, setShowResponse] = useState(false);
  return (
    <div className="bg-[#fff] p-6 rounded-xl">
      <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/images/avatar.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-dark text-[14px] -ml-4">
          {comment.author.username}
        </h2>
        <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
      </div>
      <p className="border-b-2 border-base-500 pb-2 text-base-500">
        {comment.content}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center flex-wrap-reverse gap-2 py-2">
        <div className="flex justify-start  gap-2 items-center flex-wrap">
          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
            onClick={() => setShowResponse(!showResponse)}
          >
            {showResponse ? <MinusSquare size={25} /> : <AddSquare size={25} />}
            <span>{comment.responses.length} responses</span>
          </Button>

          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />

          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            Reply
          </Button>

          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />

          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Flag size="25" />
          </Button>

          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            Hide
          </Button>
          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            Block Author
          </Button>
        </div>

        <div className="flex justify-start items-center  gap-2">
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            13 Votes
          </Button>
          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button className="text-[#31D0AA] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Like1 variant="Bold" /> <span>{comment.dislikes}</span>
          </Button>
          <Button className="text-[#E43F40] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Dislike variant="Bold" /> <span>{comment.dislikePercentage}</span>
          </Button>
        </div>
      </div>
      {/* RESPONSE */}
      <div
        className={` ${
          showResponse ? "max-h-auto" : "h-0"
        } overflow-hidden duration-700`}
      >
        <div className=" border-t-2 border-base-500 mt-2" />
        <div className="pl-6">
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap pt-2 ">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">Dexter Olaniyi</h2>
            <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
          </div>
          <p className=" pb-2 text-base-500">
            I am writing to request access to the following public records under
            the Freedom of Information Act. [Specify the documents or
            information you're seeking, e.g., meeting minutes, financial
            reports, emails, etc.]. Please provide these records in an
            electronic format if possible. Thank you.
          </p>

          {/* FOOTER */}
          <div className="flex justify-between items-center flex-wrap-reverse gap-2">
            <div className="flex justify-start  gap-2 items-center pt-4 flex-wrap">
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]">
                <AddSquare size={25} />
                <span>2 responses</span>
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Reply
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Flag size="25" />
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Hide
              </Button>
              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Block Author
              </Button>
            </div>

            <div className="flex justify-start items-center  gap-2 pt-4">
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                13 Votes
              </Button>
              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="text-[#31D0AA] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Like1 variant="Bold" /> <span>10</span>
              </Button>
              <Button className="text-[#E43F40] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Dislike variant="Bold" /> <span>3</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DebateCommentCard;
