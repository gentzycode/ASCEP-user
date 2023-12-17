import { Button } from "@/components/ui/button";

interface PaginationProps {
  meta?: MetaDataType;
  onPageChange: (page: number) => void;
}

const CommentsPagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
}) => {
  const { current_page, last_page, next_page_url, previous_page_url } =
    meta as MetaDataType;

  const handlePageChange = (page: number) => {
    if (page !== current_page) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between mt-4 items-center w-full">
      <Button
        onClick={() => handlePageChange(current_page - 1)}
        disabled={!previous_page_url}
        className="mr-2 h-fit rounded-md py-2 text-[14px]"
      >
        Previous
      </Button>
      <span className="text-dark">
        Page {current_page} of {last_page}
      </span>
      <Button
        onClick={() => handlePageChange(current_page + 1)}
        disabled={!next_page_url}
        className="ml-2 h-fit rounded-md py-2 text-[14px]"
      >
        Next
      </Button>
    </div>
  );
};

export default CommentsPagination;
