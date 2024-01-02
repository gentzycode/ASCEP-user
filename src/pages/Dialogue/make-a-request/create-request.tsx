import {
  MakeRequestInstruction,
  MakeRequestPageFooter,
  RequestMultiStepForm,
} from "@/components/Dialogue";
import { Separator } from "@/components/ui/separator";

interface CreateRequestPageProp {}
const CreateRequestPage: React.FC<CreateRequestPageProp> = () => {
  return (
    <div>
      <div className=" space-y-2">
        <h2 className="text-text text-3xl xl:text-4xl">Make a request</h2>
        <h2 className="text-text text-xl xl:text-2xl">
          To:{" "}
          <span className="text-royal_blue">
            Department for Levelling Up, Housing & Communities
          </span>
        </h2>
        <p className="text-base text-subtitle_text">
          Prior to September 2021, this body was known as the Ministry of
          Housing, Communities and Local Government; and prior to January 2018
          it was called the Department for Communities and Local Government. The
          ministry is responsible for National Planning Casework Unit.
        </p>
      </div>
      <Separator className="h-[2px] my-9" />
      {/* FORM */}
      <div className="flex justify-start items-start gap-14 flex-col xl:flex-row">
        <RequestMultiStepForm />
        <MakeRequestInstruction />
      </div>

      <div className=" flex justify-between flex-col gap-10 my-16 md:flex-row">
        <MakeRequestPageFooter />
        <div className=" rounded-2xl p-4 bg-primary/10 w-full max-w-[400px] h-fit space-y-3">
          <h3 className="text-dark text-xl lg:text-2xl">
            Signing your request{" "}
          </h3>
          <p className="text-dark text-base flex-1">
            Everything that you enter on this page, including your name, will be
            displayed publicly on this website forever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;
