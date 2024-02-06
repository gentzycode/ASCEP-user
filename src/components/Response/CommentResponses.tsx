import { useGetReportCommentsResonponses } from "@/api/response";
import React, { useEffect, useState } from "react";
import { ResponseComment } from ".";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { FaSpinner } from "react-icons/fa";

interface CommentResponsesProps {
  comment: ReportComment;
  reportId: string;
}

const CommentResponses = ({ comment, reportId }: CommentResponsesProps) => {
  const [perPage, setPerPage] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<ReportComment[]>([]);

  const {
    data: commentsData,
    refetch,
    isFetching,
  } = useGetReportCommentsResonponses({
    id: comment.id,
    perPage,
  });

  useEffect(() => {
    if (commentsData?.comments.length) {
      setComments(commentsData.comments);
    }
  }, [commentsData]);

  const onChange = (e: string) => {
    refetch();
    setIsOpen(e === comment.id.toString());
  };
  return (
    <Accordion
      type="single"
      onValueChange={(e) => onChange(e)}
      collapsible
      className="w-full"
    >
      <AccordionItem value={comment.id.toString()}>
        <AccordionTrigger className="pt-0 pb-2 border-b-0">
          <div className="text-sm underline">
            {isOpen ? "Hide" : "View"} Replies ({comment.comment_response_cache}
            )
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t-0">
          {comments.length && (
            <>
              {comments.map((comment) => (
                <ResponseComment
                  key={comment.id}
                  comment={comment}
                  reportId={reportId}
                />
              ))}
              {commentsData?.meta.next_page_url && (
                <button
                  onClick={() => setPerPage((prev) => prev + 3)}
                  className="text-sm underline"
                >
                  Show More
                </button>
              )}
              {isFetching && (
                <FaSpinner className="mx-auto my-3 text-xl animate-spin text-primary" />
              )}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default React.memo(CommentResponses);
