/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from "iconsax-react";
import { Input } from "../ui/input";
import { getAlphabetLetter } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSubmitSurvey } from "@/api/survey";

interface SurveyDetailsProps {
  survey: SurveyInfoType;
}

interface SurveyUpdatableQuestionOption {
  text: string;
  isSelected: boolean;
}

interface SurveyUpdatableQuestion extends SurveyQuestion {
  options: SurveyUpdatableQuestionOption[] | null;
}

function replaceEmptyResponses(
  answers: SurveyAnswer[],
  responses: { id: number; value: string }[]
) {
  return answers.map((answer) => {
    if (
      typeof answer.response_text === "string" &&
      answer.response_text === ""
    ) {
      const matchingResponse = responses.find(
        (response) => response.id === answer.question_id
      );

      if (matchingResponse) {
        return { ...answer, response_text: matchingResponse.value };
      }
    }

    return answer;
  });
}

export default function SurveyDetails({ survey }: SurveyDetailsProps) {
  const [questions, setQuestions] = useState<SurveyUpdatableQuestion[]>([]);
  const [responses, setResponses] = useState(
    survey.questions
      .filter((question) => question.response_type === "text")
      .map((selected) => ({
        id: selected.id,
        value: "",
      }))
  );

  const handleInputChange = (questionId: number, value: string) => {
    const inputIndex = responses.findIndex(
      (response) => response.id === questionId
    );
    setResponses((prevReponses) => {
      const newResponses = [...prevReponses];
      newResponses[inputIndex].value = value;
      return newResponses;
    });
  };

  useEffect(() => {
    const questions: SurveyUpdatableQuestion[] = survey.questions.map(
      (question) => ({
        ...question,
        options:
          question.response_type !== "text" && question.question_options
            ? question.question_options?.map((option) => ({
                text: option,
                isSelected: false,
              }))
            : null,
      })
    );

    setQuestions(questions);
  }, [survey]);

  const handleSelect = (
    selectedQuestion: SurveyUpdatableQuestion,
    selectedOption: SurveyUpdatableQuestionOption
  ) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === selectedQuestion.id && question.options) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.text === selectedOption.text
                ? { ...option, isSelected: !option.isSelected }
                : question.response_type === "single_choice"
                ? { ...option, isSelected: false }
                : option
            ),
          };
        }
        return question;
      });
    });
  };

  const { mutate, isLoading } = useSubmitSurvey();
  const handleSubmit = () => {
    const answerOne: SurveyAnswer[] = questions.map((question) => ({
      question_id: question.id,
      response_text: question.options
        ? question.options
            ?.filter((filteredQuestion) => filteredQuestion.isSelected)
            .map((question) => question.text)
        : "",
    }));

    const answer = replaceEmptyResponses(answerOne, responses);

    mutate({ answer });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-text">{survey.title}</h3>
        <div className="items-center gap-1 text-sm md:flex">
          <div className="flex items-center gap-1">
            <Location color="black" size={14} />
            <p>{survey.location_meta}</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="font-bold text-link">
              Posted on {new Date(survey.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="my-5 leading-7 text-text">{survey.description}</div>

      <div className="flex gap-6">
        {survey.surveySDGs.map((sdg) => (
          <img
            src={sdg.sdg.banner}
            className="w-16 h-16 rounded-lg "
            key={sdg.sdg_id}
            alt="sdg"
          />
        ))}
      </div>

      <div className="space-y-8 xl:w-9/12">
        {questions.map((question, i) => {
          const questionIndex = responses.findIndex(
            (response) => response.id === question.id
          );

          return (
            <div key={question.id} className="space-y-4 leading-7 text-text">
              <p className="text-lg leading-7 text-text">Question {i + 1}</p>
              <p>{question.question_text}</p>
              {question.response_type === "text" ? (
                <Input
                  value={responses[questionIndex].value}
                  onChange={(e) =>
                    handleInputChange(question.id, e.target.value)
                  }
                  className="input-style focus-visible:ring-0"
                />
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {question.options?.map((option, i) => (
                    <div
                      className={`flex items-center gap-2 px-4 py-3 transition-all duration-500 ease-in-out cursor-pointer hover:bg-primary rounded-2xl ${
                        option.isSelected ? "bg-primary" : "bg-white "
                      }`}
                      key={i}
                      onClick={() => handleSelect(question, option)}
                    >
                      <p className="capitalize ">{getAlphabetLetter(i + 1)}.</p>
                      {option.text}
                    </div>
                  ))}
                </div>
              )}{" "}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          className="w-[160px]"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Submit Survey
        </Button>
      </div>
    </div>
  );
}
