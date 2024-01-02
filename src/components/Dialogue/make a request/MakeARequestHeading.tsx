interface MakeARequestHeadingProp {}
const MakeARequestHeading: React.FC<MakeARequestHeadingProp> = () => {
  return (
    <div className=" space-y-6">
      <h2 className="text-text text-3xl xl:text-4xl">Find an Authority</h2>
      <p className="text-base text-subtitle_text">
        ACEPS Dialogue covers requests to 46,398 authorities, type in the name
        of the public authority you'd like information from. By law, they have
        to respond (<span className="text-primary">why?</span>).
      </p>
    </div>
  );
};

export default MakeARequestHeading;
