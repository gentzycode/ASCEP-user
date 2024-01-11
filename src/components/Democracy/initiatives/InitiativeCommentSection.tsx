import { IconWrapper, PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { CloseCircle, Danger } from "iconsax-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FilterButtons, FormInput, InitiativeCommentCard } from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import { useEffect, useState } from "react";
import {
  useGetInitiativeComments,
  usePublishInitiativeComment,
} from "@/api/democracy/initiatives";
import { initiativeCommentSchema } from "@/schemas/InitiativesSchema";

interface InitiativeCommentSectionProp {}
const InitiativeCommentSection: React.FC<InitiativeCommentSectionProp> = () => {
  const { isLoggedIn } = useAuthContext();
  const { initiativeId } = useParams();

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishInitiativeComment();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetInitiativeComments(initiativeId!, page, filter);

  const form = useForm<z.infer<typeof initiativeCommentSchema>>({
    resolver: zodResolver(initiativeCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      initiative_id: initiativeId,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof initiativeCommentSchema>) {
    await publishComment(values);
    if (commentsData) {
      reset();
    }
  }
  useEffect(() => {
    refetch();
  }, [page, filter]);

  return (
    <>
      <div className="w-full">
        <h2 className="pb-2 mb-4 pt-0 pl-0 border-b-4 text-lg text-text font-medium border-primary w-fit">
          Comments
        </h2>
      </div>
      {!isLoggedIn ? (
        <div className="flex items-center justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">
              You must{" "}
              <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
                sign in
              </Link>
              or
              <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
                sign up
              </Link>{" "}
              to leave a comment.
            </p>
          </div>
          <Button className="bg-transparent hover:bg-transparent w-fit h-fit">
            <CloseCircle size="32" />
          </Button>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-[900px]"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="content"
                errors={errors}
              />

              <Button
                type="submit"
                className="w-full max-w-[200px] h-12"
                isLoading={isPublishingComment}
                disabled={isPublishingComment}
              >
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={commentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          defaultFilterButtonValue="newest"
          isFiltering={isFetchingComments}
        />
      </div>

      {/* LOADING */}
      {isLoadingComments && <PageLoader />}

      {/* NO COMMENTS */}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-text text-base md:text-xl">
            This Initiative has no comments yet
          </h1>
        </div>
      )}

      {/* COMMENT CARD */}
      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100 "
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <InitiativeCommentCard comment={comment} key={comment.id} />
          ))}

          {/* PAGINATION */}
          <Pagination
            page={page}
            setPage={setPage}
            paginationData={commentsData.meta}
            isFetching={isFetchingComments}
          />
        </div>
      )}
    </>
  );
};

export default InitiativeCommentSection;
