import { Button } from "@/components/ui/button";
import { MultiAnswerQuestion, SingleAnswerQuestion } from "..";

interface QuestionsProp {
  question: VotingQuestionsType;
}
const Questions: React.FC<QuestionsProp> = ({ question }) => {
  const { response_type } = question;

  if (response_type === "single") {
    return <SingleAnswerQuestion questions={question} />;
  }

  if (response_type === "multi_choice") {
    return <MultiAnswerQuestion questions={question} />;
  }

  // return (
  //   <div className="py-10 max-w-[900px] flex flex-col gap-20">
  //     {response_type === "single" && (
  //       <SingleAnswerQuestion questions={question} />
  //     )}

  //     {response_type === "multi_choice" && (
  //       <SingleAnswerQuestion questions={question} />
  //     )}

  //     <div className="flex flex-col justify-center gap-4">
  //       <h4 className="text-dark text-lg md:text-xl">
  //         Do you consider it necessary to remodel the square?
  //       </h4>
  //       <div className="flex justify-start gap-4 flex-col items-start">
  //         <Button className="bg-transparent border border-dark min-w-[150px] whitespace-normal h-fit">
  //           Yes
  //         </Button>
  //         <Button className="bg-transparent border border-dark min-w-[150px] whitespace-normal h-fit">
  //           No
  //         </Button>
  //       </div>
  //     </div>

  //     <div className="flex flex-col justify-center gap-4">
  //       <h4 className="text-dark text-lg md:text-xl  ">
  //         Which of the two finalist projects do you prefer to be carried out?
  //       </h4>
  //       <div className="flex justify-start items-start gap-4 flex-col">
  //         <Button className="bg-transparent border border-dark min-w-[150px] whitespace-normal h-fit">
  //           Which of the two finalist projects do you prefer to be carried out?
  //         </Button>
  //         <Button className="bg-transparent border border-dark min-w-[150px] whitespace-normal h-fit">
  //           Project 2
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Questions;
