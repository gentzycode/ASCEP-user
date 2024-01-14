import { formattedDate } from "@/utils/helper";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Notification, Messages1 } from "iconsax-react";
import { CategoryDisplay, TagDisplay, TargetDisplay } from "..";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useSupportInitiative } from "@/api/democracy/initiatives";
import { useInitiativeContext } from "@/contexts/InitiativeContext";

interface InitiativesCardViewCardProps {
  initiative: InitiativeType;
}

const InitiativesCardViewCard: React.FC<InitiativesCardViewCardProps> = ({
  initiative,
}) => {
  const { mutateAsync: supportInitiative, isLoading: isSupporting } =
    useSupportInitiative(initiative.id);
  const { refetchInitiatives } = useInitiativeContext();

  const handleSupport = async () => {
    await supportInitiative();
    refetchInitiatives();
  };

  return (
    <div className=" flex flex-col gap-3 max-w-[600px] ">
      {/* TOP CON */}
      <div className="bg-[#FFFFFF] shadow-xl flex flex-col justify-start rounded-xl overflow-hidden flex-1">
        <div className="p-8">
          <div>
            <Link to={ROUTES.INITIATIVE_INFO_ROUTE(initiative.id)}>
              <h1 className="text-[20px] text-dark hover:underline">
                {initiative.title}
              </h1>
            </Link>
            {/* user info */}
            <div className="flex gap-3 my-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={initiative.author.profile_picture ?? undefined}
                />
                <AvatarFallback className="uppercase font-extrabold">
                  {initiative.author.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-dark text-[14px]">
                  {initiative.author.username}
                </h2>
                <h3 className="text-[12px] text-subtle_text">
                  {initiative.author.username}
                </h3>
              </div>
            </div>
            <div className="flex justify-start gap-4 items-center">
              <p className="text-[12px] text-base-400 my-3 ">
                {formattedDate(initiative.createdAt)}
              </p>
              <p
                className={`${
                  initiative.status === "in review"
                    ? "text-primary bg-primary/10"
                    : "text-[#31D0AA] bg-[#31D0AA]/10"
                } text-base font-extrabold my-3 capitalize px-4 rounded-full`}
              >
                {initiative.status}
              </p>
            </div>
            <p className="text-14px text-transparent h-[80px] pb-10 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
              {initiative.description}
            </p>
          </div>

          <div className="my-6 flex justify-between gap-1 flex-wrap">
            <Button
              className="bg-dark text-light capitalize text-[12px] disabled:opacity-100"
              disabled
            >
              <Notification size="25" />
              <span>{initiative.total_followers_cache} followers</span>
            </Button>
            <Button
              className="bg-dark text-light capitalize text-[12px] disabled:opacity-100"
              disabled
            >
              <Messages1 size="25" />
              <span>{initiative.total_comments_cache} comments</span>
            </Button>
          </div>
          {/* TARGETS */}
          <div className="flex gap-[8px] flex-wrap my-3">
            {initiative.initiativeTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
          {/* TAGS */}
          <div className="flex gap-[8px] flex-wrap">
            {initiative.initiativeTag.map((tag, i) => (
              <TagDisplay
                tag={tag.tag_name}
                key={tag.id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
          {/* CATEGORIES */}
          <div className="flex gap-[8px] flex-wrap mt-3">
            {initiative.initiativeCategory.map((category, i) => (
              <CategoryDisplay
                category={category.categoryDetail.name}
                key={category.category_id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CON */}
      {initiative.status !== "in review" ? (
        <div
          className="bg-[#FFFFFF] shadow-xl flex
       justify-center items-center  rounded-xl px-4 gap-4 py-4 "
        >
          <Button
            className={`h-[74px] hover:bg-inherit px-8 w-fit disabled:opacity-100`}
            disabled
          >
            {initiative.total_support_cache}/ {initiative.supportNeeded}
          </Button>
          <div className="flex flex-col gap-2">
            <Button
              className="h-fit py-2 text-[12px] bg-dark text-light disabled:opacity-100"
              disabled
            >
              <Messages1 size="20" />
              <span>{initiative.support_needed} support needed</span>
            </Button>
            <Button
              className="h-11 text-[16px] w-full rounded-full"
              onClick={handleSupport}
              isLoading={isSupporting}
              disabled={isSupporting}
            >
              Support
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="bg-[#FFFFFF] shadow-xl 
      rounded-xl px-4 gap-4 py-4 "
        >
          <Link to={ROUTES.INITIATIVE_INFO_ROUTE(initiative.id)}>
            <Button className="h-11 text-[16px] w-full rounded-full">
              Check it out
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default InitiativesCardViewCard;
