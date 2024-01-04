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
      <PaginationContent className="list-none flex justify-between w-full items-center flex-wrap">
        <p className="text-text text-base">
          {page} - {numberOfPages} pages
        </p>

        <div className="flex items-center gap-3">
          <p className="text-text text-sm">The page you are on</p>
          <Select
            defaultValue={page}
            onValueChange={(value: number) => setPage(value)}
          >
            <SelectTrigger className="w-fit flex gap-3 font-bold text-[#71bb61] ring-0 focus:ring-4 rounded-2xl focus:ring-offset-0  focus:ring-[#DFDFDF]">
              <SelectValue placeholder={page} />
            </SelectTrigger>
            <SelectContent sideOffset={0} align="center">
              <SelectGroup className="m-0 p-0">
                {Array.from({ length: numberOfPages }).map((_, i) => (
                  <SelectItem
                    value={1 + i}
                    className=" text-sm flex justify-center"
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <PaginationItem className="h-fit flex items-center">
            <Button
              className="h-fit w-fit p-0 rounded-lg text-dark bg-transparent text-2xl "
              isLoading={isFetching}
              disabled={isFetching || !previous_page_url}
              onClick={() => setPage(page - 1)}
            >
              <IoIosArrowBack />
            </Button>
          </PaginationItem>
          <PaginationItem className="h-fit flex items-center">
            <Button
              className="h-fit w-fit rounded-lg text-dark bg-transparent text-2xl p-0"
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
