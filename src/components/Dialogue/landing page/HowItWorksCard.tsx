import { useGetAuthoritiesAndRequestCount } from "@/api/dialogue/requests";
import { IconWrapper } from "@/components/custom";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { SearchAuthoritiesForm, SearchedAuthoritiesList } from "..";
import { useGetAllAuthorities } from "@/api/authorities";

interface HowItWorksCardProp {}

const cardDetails = [
  {
    title: "Request",
    description:
      " Use this site to make your request for information – we'll show you",
    icon: <MdOutlineEmail />,
  },
  {
    title: "Response",
    description:
      " We'll drop you an email as soon as your request gets a response.",
    icon: <MdOutlineEmail />,
  },
  {
    title: "Publish",
    description:
      "We publish it all online. Great! Now you have your answer, and everybody else can access it too.",
    icon: <IoLocationOutline />,
  },
];

const HowItWorksCard: React.FC<HowItWorksCardProp> = () => {
  const { data } = useGetAuthoritiesAndRequestCount();

  const [searchResult, setsearchResult] = useState<AuthorityType[] | undefined>(
    undefined
  );

  const { data: allAuthorities, isLoading } = useGetAllAuthorities();

  useEffect(() => {
    if (allAuthorities && !isLoading) {
      setsearchResult(allAuthorities.slice(0, 3));
    }
  }, [allAuthorities]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {cardDetails.map((detail, i) => (
          <div
            className="bg-primary/10 p-6 flex flex-col gap-2 rounded-3xl max-w-[500px] "
            key={i}
          >
            <IconWrapper className="text-primary bg-primary/20 text-4xl p-1">
              {detail.icon}
            </IconWrapper>
            <h2 className="text-dark text-2xl">{detail.title}</h2>
            <p className="text-base">{detail.description}</p>
          </div>
        ))}
      </div>
      <div className="my-8 space-y-6 bg-gradient-to-bl from-[#FEF7DC] via-[#FFE4DB] to-[#E9F6FE] p-6 rounded-3xl">
        <h2 className="text-dark text-2xl">
          Who can I request information from?
        </h2>
        <p className="text-base text-subtitle_text">
          ACEPS Dialogue covers requests to {data?.totalAuthorities}{" "}
          authorities, type in the name of the public authority you'd like
          information from. By law, they have to respond (
          <span className="text-primary">why?</span>).
        </p>
        <div className="flex items-start justify-start gap-4 flex-wrap flex-col">
          <SearchAuthoritiesForm
            setsearchResult={setsearchResult}
            resetButton={false}
            cancelButton={true}
          />
          {searchResult && searchResult?.length > 0 && (
            <SearchedAuthoritiesList searchResult={searchResult.slice(0, 2)} />
          )}
        </div>
      </div>
    </>
  );
};

export default HowItWorksCard;
