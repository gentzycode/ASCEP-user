import { Edit } from "iconsax-react";
import { AddQuestionModal } from "..";
import useDisclosure from "@/hooks/useDisclosure";

interface EditQuestionButtonProp {
  question: VotingQuestionsType;
}
const EditQuestionButton: React.FC<EditQuestionButtonProp> = ({ question }) => {
  const {
    isOpen: isModalOpen,
    onClose: closeModal,
    onOpen: openModal,
  } = useDisclosure();
  const handleEdit = () => {
    openModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <Edit
        size="25"
        onClick={handleEdit}
        className="cursor-pointer text-primary"
      />
      {/* EDIT MODAL */}
      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        isEditing={true}
        question={question}
      />
    </>
  );
};

export default EditQuestionButton;
