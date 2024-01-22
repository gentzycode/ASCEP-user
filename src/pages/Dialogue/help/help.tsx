import {
  AboutFIO,
  AboutFIOAnambra,
  AccessingInformation,
  AdvancedSearch,
  BeginnerGuide,
  Exemptions,
  HowWeRunTheSite,
  Introduction,
  LearnMore,
  MakingRequest,
  NoResponse,
  Principles,
  PrivacyComponent,
  UnhappyWithResponse,
} from "@/components/Dialogue";
import { IconWrapper } from "@/components/custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface DialogueHelpHomePageProp {}
const DialogueHelpHomePage: React.FC<DialogueHelpHomePageProp> = () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const tab = location?.state?.helpTab;
  const [currentTab] = useState(tab ? tab : "introduction");

  const handleTabSwitch = () => {
    setMenu(false);
  };

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full flex flex-row-reverse gap-6 relative"
      orientation="vertical"
      onValueChange={handleTabSwitch}
    >
      <IconWrapper
        className="md:hidden rounded-none flex w-fit justify-center items-center absolute right-0 bg-transparent cursor-pointer"
        onClick={() => setMenu(!menu)}
      >
        <p className="text-text text-sm">Help menu</p>
        <ArrowDown2 size="25" />
      </IconWrapper>
      <TabsList
        className={` ${
          menu ? "h-max" : "h-0"
        } grid grid-cols-1 w-[350px] space-y-9 md:h-max md:relative absolute
         overflow-hidden top-10 md:top-0`}
      >
        <div className="flex flex-col">
          <h2 className="text-base">ABOUT ACEPS Dialogue</h2>
          {About_Dialogue.map((item) => (
            <TabsTrigger
              value={item.value}
              className=" !bg-transparent !text-left px-0 py-1 text-base justify-start !shadow-none aria-[selected=true]:!text-primary"
              key={item.value}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </div>

        <div className="flex flex-col">
          <h2 className="text-base">Using ACEPS Dialogue</h2>
          {Using_Dialogue.map((item) => (
            <TabsTrigger
              value={item.value}
              className="!bg-transparent !text-left px-0 py-1 text-base justify-start !shadow-none aria-[selected=true]:!text-primary"
              key={item.value}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </div>
        <div className="flex flex-col">
          <h2 className="text-base">ACCESS TO INFORMATION HELP</h2>
          {Access_Info_Dialogue.map((item, i) => (
            <TabsTrigger
              value={item.value}
              className="!bg-transparent !text-left px-0 py-1 text-base justify-start !shadow-none aria-[selected=true]:!text-primary"
              key={i}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </div>
        <div className="flex flex-col">
          <h2 className="text-base">YOUR PRIVACY</h2>
          {Privacy.map((item, i) => (
            <TabsTrigger
              value={item.value}
              className="!bg-transparent !text-left px-0 py-1 text-base justify-start !shadow-none aria-[selected=true]:!text-primary"
              key={i}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </div>
        <div className="flex flex-col">
          <h2 className="text-base">LEARN MORE</h2>
          {Learn_More.map((item, i) => (
            <TabsTrigger
              value={item.value}
              className="!bg-transparent !text-left px-0 py-1 text-base justify-start !shadow-none aria-[selected=true]:!text-primary"
              key={i}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      <div className="w-full">
        {About_Dialogue.concat(Access_Info_Dialogue)
          .concat(Using_Dialogue)
          .concat(Privacy)
          .concat(Learn_More)
          .map((item, i) => (
            <TabsContent value={item.value} key={i}>
              {item.content}
            </TabsContent>
          ))}
      </div>
    </Tabs>
  );
};

export default DialogueHelpHomePage;

const About_Dialogue = [
  {
    title: "Introduction",
    value: "introduction",
    content: <Introduction />,
  },
  {
    title: "Principles",
    value: "principles",
    content: <Principles />,
  },
  {
    title: "How we run the site",
    value: "how-we-run",
    content: <HowWeRunTheSite />,
  },
];

const Access_Info_Dialogue = [
  {
    title: "About FOI",
    value: "about-fio",
    content: <AboutFIO />,
  },
  {
    title: "About FOI in Anambra",
    value: "about-fio-anambra",
    content: <AboutFIOAnambra />,
  },
  {
    title: "Exemptions",
    value: "exemptions",
    content: <Exemptions />,
  },
  {
    title: "Unhappy with a response?",
    value: "unhappy-response",
    content: <UnhappyWithResponse />,
  },
  {
    title: "Didn’t get a response?",
    value: "failed-response",
    content: <NoResponse />,
  },
];

const Using_Dialogue = [
  {
    title: "Making requests",
    value: "making-request",
    content: <MakingRequest />,
  },
  {
    title: "Beginner’s Guide",
    value: "beginner-guide",
    content: <BeginnerGuide />,
  },
  {
    title: "Accessing Information",
    value: "access-info",
    content: <AccessingInformation />,
  },
  {
    title: "Advanced search",
    value: "advanced-search",
    content: <AdvancedSearch />,
  },
];

const Privacy = [
  {
    title: "Your Privacy",
    value: "your-privacy",
    content: <PrivacyComponent />,
  },
];
const Learn_More = [
  {
    title: "Learn more",
    value: "learn_more",
    content: <LearnMore />,
  },
];
