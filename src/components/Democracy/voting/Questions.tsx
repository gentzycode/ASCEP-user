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
};

export default Questions;
