interface CreateRequestFormHeaderProp {
  authority: AuthorityInfoType;
}
const CreateRequestFormHeader: React.FC<CreateRequestFormHeaderProp> = ({
  authority,
}) => {
  const { description, name } = authority;
  return (
    <div className=" space-y-2">
      <h2 className="text-text text-3xl xl:text-4xl">Make a request</h2>
      <h2 className="text-text text-xl xl:text-2xl">
        To: <span className="text-royal_blue">{name}</span>
      </h2>
      <p className="text-base text-subtitle_text">{description}</p>
    </div>
  );
};

export default CreateRequestFormHeader;
