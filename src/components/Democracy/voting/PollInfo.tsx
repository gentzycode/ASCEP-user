import { CardEdit, Flag, Messages1, Setting3, Trash } from "iconsax-react";
import { Questions, SDGCard, Share, TargetDisplay } from "..";
import { useAuthContext } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";
import { formattedDate } from "@/utils/helper";
import { frontendURL } from "@/api/baseUrl";
import ALert from "@/components/custom/Alert";
import useDisclosure from "@/hooks/useDisclosure";
import { useDeletePoll } from "@/api/democracy/voting";

interface PollInfoProp {
  scrollToComments: () => void;
  poll: VotingType;
}
const PollInfo: React.FC<PollInfoProp> = ({ scrollToComments, poll }) => {
  const {
    id,
    title,
    start_date,
    end_date,
    total_comments_cache,
    summary,
    votingSDGs,
    votingTarget,
    description,
    descriptive_image,
    shareable_id,
    questions,
  } = poll;
  const { isLoggedIn } = useAuthContext();

  const { mutateAsync: deletePoll, isLoading: isDeletingPoll } =
    useDeletePoll(id);

  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDelete = async () => {
    await deletePoll();
    close();
  };
  return (
    <>
      <div className="flex justify-start gap-10 xl:flex-row flex-col">
        <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
          {/* MAIN INFO */}
          <div className="flex flex-col w-full">
            <h1 className="text-[20px] text-dark">{title}</h1>
            <div className="flex justify-start items-center gap-6 flex-wrap">
              <p className="text-[12px] text-base-400 my-3 ">
                From {formattedDate(start_date)} to {formattedDate(end_date)}
              </p>
              <div
                className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
                onClick={scrollToComments}
              >
                <Messages1 size={20} />
                {total_comments_cache} Comments
              </div>
            </div>

            {/* SUMMARY */}
            <div className="py-4">
              <p className="text-sm md:text-base py-2 text-subtitle_text text-justify">
                {summary}
              </p>
            </div>
          </div>

          {/* SDGs */}
          {votingSDGs.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {votingSDGs.map((SDGs, i) => (
                <SDGCard SDG={SDGs.sdg} key={SDGs.sdg_id} index={i} />
              ))}
            </div>
          )}

          {/* TARGETS */}
          {votingTarget.length > 0 && (
            <div className="flex gap-[8px] flex-wrap">
              {votingTarget.map((target, i) => (
                <TargetDisplay
                  target={target.targetInfo}
                  key={target.target_id}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* IMAGE */}
          {descriptive_image && (
            <div className="w-full max-w-[700px] relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden my-8">
              <img
                src={descriptive_image}
                alt="poll image"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="w-full  md:w-[300px] flex justify-start flex-col gap-10">
          {isLoggedIn && (
            <>
              <div className="flex gap-2">
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

              {/* AUTHOR */}

              <div>
                <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                  Author
                </h2>
                <Link to={ROUTES.EDIT_VOTE_ROUTE(id)}>
                  <Button
                    className="text-dark text-base h-fit my-4 px-8 py-3 w-full justify-center
               gap-3 flex rounded-lg max-w-[220px]"
                  >
                    <span>Edit</span>
                    <CardEdit />
                  </Button>
                </Link>
                <Link to={ROUTES.CONFIGURE_VOTE_ROUTE(id)}>
                  <Button
                    className="text-dark text-base h-fit my-4 px-8 py-3 w-full justify-center
               gap-3 flex rounded-lg max-w-[220px]"
                  >
                    <span>Configure</span>
                    <Setting3 />
                  </Button>
                </Link>
                <Button
                  className="text-red-500 border border-red-500
                 hover:text-light text-base  bg-transparent hover:bg-red-400 h-fit my-4 px-8 py-3 
                 justify-center gap-1 flex rounded-lg w-full max-w-[220px]"
                  onClick={openAlert}
                >
                  <span>Delete Poll</span>
                  <Trash />
                </Button>
              </div>
            </>
          )}

          {/* SHARE */}
          <Share
            shareableURL={frontendURL + `/democracy/share/${shareable_id}`}
          />
        </div>
      </div>

      {/* QUESTIONS */}
      {questions.length > 0 && (
        <>
          <Separator className="my-10 bg-subtle_text h-[2px]" />
          <div className="py-10 max-w-[900px] flex flex-col gap-10">
            {questions.map((question) => (
              <Questions question={question} key={question.id} />
            ))}
          </div>
        </>
      )}

      <Separator className="my-10 bg-subtle_text h-[2px]" />

      {/* MORE INFO */}
      <div className="w-full max-w-[900px]">
        <h5 className="text-text capitalize text-xl md:text-2xl py-5 ">
          More information
        </h5>
        <p className="text-subtitle_text  text-justify">{description}</p>
      </div>

      {/* DELETE ALERT */}
      <ALert
        message="Are you sure you want to delete this poll"
        description="This action cannot be undone. This will permanently delete your poll."
        action={handleDelete}
        isOpen={alertOpen}
        close={closeAlert}
        loadingAction={isDeletingPoll}
      />
    </>
  );
};

export default PollInfo;
