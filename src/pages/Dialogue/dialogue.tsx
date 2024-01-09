import {
  FreedomOfInformation,
  Heading,
  HowItWorks,
} from "@/components/Dialogue";

interface DialoguLandingPageProp {}
const DialoguLandingPage: React.FC<DialoguLandingPageProp> = () => {
  return (
    <div className="max-w-[900px]">
      <Heading />
      <HowItWorks />
      <FreedomOfInformation />
    </div>
  );
};

export default DialoguLandingPage;
