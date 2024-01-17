interface IntroductionProp {}
const Introduction: React.FC<IntroductionProp> = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Introduction</h2>
      <p className="text-subtitle_text text-base xl:text-lg">
        Welcome to ASCEP Dialogue, a pioneering platform at the heart of
        enhancing civic engagement in Anambra State. Here, we bridge the gap
        between citizens and government, fostering an environment where
        information flows freely and public discourse flourishes. Our platform
        is dedicated to empowering citizens with access to critical information
        and providing a space for open dialogue on matters that impact our
        community.
      </p>
    </div>
  );
};

export default Introduction;
