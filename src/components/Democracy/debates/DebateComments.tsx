import { DebateCommentCard, FilterButtons, FormInput } from "..";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import { IconWrapper } from "@/components/custom";
import { CloseCircle, Danger } from "iconsax-react";
import { Link, useParams } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/providers/AuthProvider";
import { useGetDebateComments } from "@/api/democracy/debates";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface DebateCommentsCardProps {
  debate: DebateType;
}
const DebateComments: React.FC<DebateCommentsCardProps> = ({ debate }) => {
  const { isLoggedIn } = useAuthContext();
  const [page] = useState(1);
  const { debateId } = useParams();

  const { data, isLoading: isLoadingComments } = useGetDebateComments(
    parseInt(debateId!),
    page
  );
  const commentSchema = z.object({
    comment: z
      .string({ required_error: "comment text is required" })
      .refine((data) => data.trim() !== "", {
        message: "comment text cannot be empty",
      }),
  });
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    console.log(values);
    reset();
  }

  const comments = [
    {
      content: "First comment",
      id: 8,
      user_id: 5,
      author: {
        username: "sonx24",
        profile_picture:
          "http://localhost:3333/uploads/profiles/1701110655_Screenshotfrom2023-11-2712-23-14.png",
        id: 5,
      },
      responses: [],
      likes: 0,
      dislikes: 0,
      likePercentage: 0,
      dislikePercentage: 0,
      userVoted: false,
    },
    {
      content: "Second comment response",
      id: 14,
      user_id: 5,
      author: {
        username: "sonx24",
        profile_picture:
          "http://localhost:3333/uploads/profiles/1701110655_Screenshotfrom2023-11-2712-23-14.png",
        id: 5,
      },
      responses: [],
      likes: 0,
      dislikes: 0,
      likePercentage: 0,
      dislikePercentage: 0,
      userVoted: false,
    },
    {
      content: "Second comment",
      id: 9,
      user_id: 5,
      author: {
        username: "sonx24",
        profile_picture:
          "http://localhost:3333/uploads/profiles/1701110655_Screenshotfrom2023-11-2712-23-14.png",
        id: 5,
      },
      responses: [
        {
          response_id: 14,
          comment_id: 9,
          commentDetail: {
            content: "Second comment response",
            id: 14,
            user_id: 5,
            user: {
              username: "sonx24",
              profile_picture:
                "http://localhost:3333/uploads/profiles/1701110655_Screenshotfrom2023-11-2712-23-14.png",
              id: 5,
            },
          },
        },
      ],
      likes: 0,
      dislikes: 0,
      likePercentage: 0,
      dislikePercentage: 0,
      userVoted: false,
    },
  ];

  console.log("data comments", data);

  return (
    <>
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
              </Link>{" "}
              or{" "}
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
              className="flex flex-col gap-4"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="comment"
                errors={errors}
              />

              <Button type="submit" className="w-fit">
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )}

      <FilterButtons
        filterButtonOptions={debateFilterButtonOptions}
        filterByButton={() => {}}
      />

      {/* <div className="w-full flex justify-center">
        {isLoadingComments && (
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        )}
      </div> */}
      {comments && (
        <>
          {comments.map((comment) => (
            <DebateCommentCard comment={comment} key={comment.id} />
          ))}
        </>
      )}
    </>
  );
};
export default DebateComments;
