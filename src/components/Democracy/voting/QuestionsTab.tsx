import { Button } from "@/components/ui/button";
import { AddQuestionModal, NotFound, QuestionTable } from "..";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetPollQuestions } from "@/api/democracy/voting";
import { PageLoader } from "@/components/custom";
import { useParams } from "react-router-dom";

interface QuestionsTabProp {}
const QuestionsTab: React.FC<QuestionsTabProp> = () => {
  const { pollId } = useParams();

  const {
    data: questions,
    isLoading: isLoadingQuestions,
    isError,
    isRefetching,
  } = useGetPollQuestions(pollId!);

  const {
    isOpen: isModalOpen,
    onClose: closeModal,
    onOpen: openModal,
  } = useDisclosure();

  return (
    <>
      <div className="flex justify-end">
        <Button className="h-fit text-dark rounded-xl mt-2" onClick={openModal}>
          Add Question
        </Button>
      </div>
      <AddQuestionModal isOpen={isModalOpen} onClose={closeModal} />
      {/* LOADING */}
      {(isLoadingQuestions || isRefetching) && <PageLoader />}

      {/* ERROR */}
      {isError && !isLoadingQuestions && !questions && (
        <NotFound message="No Questions Found" />
      )}

      {/* QUESTION TABLE */}
      {questions && questions?.length > 0 ? (
        <QuestionTable questions={questions} />
      ) : (
        <h1 className="text-text text-base ">This poll has no questions</h1>
      )}
    </>
  );
};

export default QuestionsTab;
