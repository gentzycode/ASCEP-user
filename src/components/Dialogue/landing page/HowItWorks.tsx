import { HowItWorksCards } from "..";

interface HowItWorksProp {}
const HowItWorks: React.FC<HowItWorksProp> = () => {
  return (
    <div className="pt-16">
      <h2 className="text-text text-3xl xl:text-4xl">How it Works</h2>
      <p className="text-subtle_text py-4 text-xl xl:text-2xl">
        You have the right to request information from any public body, and get
        answers. ACEPS Dialogue helps you make a Freedom of Information request
        for free. It also publishes all requests online.
      </p>
      <HowItWorksCards />
    </div>
  );
};

export default HowItWorks;
