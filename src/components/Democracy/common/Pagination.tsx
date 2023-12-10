import { Button } from "@/components/ui/button";
import { filterDebateSchema } from "@/schemas/DebateSchema";
import { UseMutateFunction } from "react-query";
import * as z from "zod";
interface PaginationProps {
  meta?: DebateMetaDataType;
  onPageChange: UseMutateFunction<
    any,
    unknown,
    {
      page: number;
      perPage: number;
      filter: z.infer<typeof filterDebateSchema>;
    }
  >;
  perPage: number;
  filterOptions: z.infer<typeof filterDebateSchema>;
}

const Pagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
  perPage,
  filterOptions,
}) => {
  const { current_page, last_page, next_page_url, previous_page_url } =
    meta as DebateMetaDataType;

  const getFiltersWithValues = () => {
    const entries = Object.entries(filterOptions);
    const filteredEntries = entries.filter(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    const filteredObject = Object.fromEntries(filteredEntries);

    return filteredObject;
  };

  const handlePageChange = (page: number) => {
    if (page !== current_page) {
      onPageChange({ page, perPage, filter: getFiltersWithValues() });
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

export default Pagination;
