import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SelectViewport } from "@radix-ui/react-select";
interface PaginationComponentProp {
  paginationData: MetaDataType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching?: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProp> = ({
  paginationData,
  page,
  setPage,
  isFetching,
}) => {
  const { next_page_url, per_page, previous_page_url, total } = paginationData;

  const numberOfPages = Math.ceil(total / per_page);
  return (
    <Pagination className="relative my-8">
      <PaginationContent className="flex flex-wrap items-center justify-between w-full list-none">
        <p className="text-base text-text">
          {page} - {numberOfPages} pages
        </p>

        <div className="flex items-center gap-3">
          <p className="text-sm text-text">The page you are on</p>
          <Select
            value={page}
            onValueChange={(value: number) => setPage(value)}
          >
            <SelectTrigger className="w-fit flex gap-3 font-bold text-[#71bb61] ring-0 focus:ring-4 rounded-2xl focus:ring-offset-0  focus:ring-[#DFDFDF]">
              <SelectValue placeholder={page} />
            </SelectTrigger>
            <SelectContent sideOffset={0} align="center" className="min-w-fit">
              <SelectGroup className="p-0 m-0">
                {Array.from({ length: numberOfPages }).map((_, i) => (
                  <SelectItem
                    value={1 + i}
                    className="flex justify-center text-sm w-fit"
                    key={i}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <PaginationItem className="flex items-center h-fit">
            <Button
              className="p-0 text-2xl bg-transparent rounded-lg h-fit w-fit text-dark "
              isLoading={isFetching}
              disabled={isFetching || !previous_page_url}
              onClick={() => setPage(page - 1)}
            >
              <IoIosArrowBack />
            </Button>
          </PaginationItem>
          <PaginationItem className="flex items-center h-fit">
            <Button
              className="p-0 text-2xl bg-transparent rounded-lg h-fit w-fit text-dark"
              isLoading={isFetching}
              disabled={isFetching || !next_page_url}
              onClick={() => setPage(page + 1)}
            >
              <IoIosArrowForward />
            </Button>
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
