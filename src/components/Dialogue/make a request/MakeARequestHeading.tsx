import { useGetAllAuthorities } from "@/api/authorities";

interface MakeARequestHeadingProp {}
const MakeARequestHeading: React.FC<MakeARequestHeadingProp> = () => {
  const { data: authorities } = useGetAllAuthorities();
  return (
    <div className=" space-y-6">
      <h2 className="text-text text-3xl xl:text-4xl">Find MDA</h2>
      <p className="text-base lg:text-2xl text-subtitle_text">
        ACEPS Dialogue covers requests to {authorities?.length} authorities,
        type in the name of the public authority you'd like information from. By
        law, they have to respond (<span className="text-primary">why?</span>).
      </p>
    </div>
  );
};

export default MakeARequestHeading;
