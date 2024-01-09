import { Button } from "@/components/ui/button";
import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { debateCommentSchema } from "@/schemas/DebateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetDebateCommentResponses,
  usePublishDebateComment,
  useVoteDebateComment,
} from "@/api/democracy/debates";
import { CommentCard, DebateCommentResponse, FormInput } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";

interface DebateCommentCardProps {
  comment: CommentType;
}

const DebateCommentCard: React.FC<DebateCommentCardProps> = ({ comment }) => {
  const [dynamicPadding] = useState(20);

  const { debateId } = useParams();

  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishDebateComment();

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDebateCommentResponses(comment.id);

  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteDebateComment();

  // CLose responses on click away
  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });

  const form = useForm<z.infer<typeof debateCommentSchema>>({
    resolver: zodResolver(debateCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      debate_id: "",
      comment_reference: "",
    },
  });


      <div
        className={`${showResponse ? "" : "h-0  overflow-hidden"} ${
          isLoadingResponses && "opacity-50 pointer-events-none"
        }`}
      >
        {Data?.pages.map((commentsData, i) => (
          <div key={i}>
            {commentsData.comments.map((response) => (
              <DebateCommentResponse
                key={response.id}
                response={response}
                paddingLeft={dynamicPadding + 20}
              />
            ))}
          </div>
        ))}

        <Separator orientation="horizontal" className="bg-base-500 my-1" />
        {Data?.pages[Data.pages.length - 1].meta.next_page_url && (
          <Button
            className="w-full h-fit bg-transparent py-4 hover:bg-transparent -mb-5"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};
export default DebateCommentCard;
