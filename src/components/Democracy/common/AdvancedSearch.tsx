import { IconWrapper } from "../../custom";
import { Calendar2, Filter } from "iconsax-react";
import { Button } from "../../ui/button";
import { FilterButtons } from "..";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface AdvancedSearchProps {
  filterOptions: string[];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  advanceSearch: boolean;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  filterOption: string;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filterOptions,
  view,
  setView,
  advanceSearch,
  setAdvanceSearch,
  filterOption,
  setFilterOption,
}) => {
  return (
    <>
      <div className=" flex justify-between md:justify-end gap-[8px] items-center  mb-4">
        <div className="md:hidden">
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card view" ? setView("list view") : setView("card view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="20" color="#292925" />
            </IconWrapper>
            <span>{view === "card view" ? "List View" : "Card View"}</span>
          </button>
        </div>
        <Button
          className="text-[18px] font-400 text-right md:w-fit bg-transparent p-0 hover:bg-transparent"
          onClick={() => setAdvanceSearch(!advanceSearch)}
        >
          Advanced Search
        </Button>
      </div>

      <div className="flex justify-between gap-2 mb-2 flex-wrap">
        <FilterButtons
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          filterOptions={filterOptions}
        />
        <div className="hidden md:block">
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card view" ? setView("list view") : setView("card view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="25" color="#292925" />
            </IconWrapper>
            <span>{view === "card view" ? "List View" : "Card View"}</span>
          </button>
        </div>
      </div>

      {/* ADVANCED SEARCH */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-4 duration-300 overflow-hidden ${
          advanceSearch ? "h-[300px]" : "h-0"
        }`}
      >
        <div className="col-span-2 md:col-span-3">
          <Label className="text-dark text-[12px]">By words</Label>
          <Input className="rounded-full h-[42px] bg-transparent border-subtle_tex focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>
        <div className="col-span-1">
          <Label className="text-dark text-[12px]">By words</Label>
          <Select>
            <SelectTrigger className="rounded-full h-[42px] bg-transparent text-[12px] border-subtle_text text-subtle_text focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Choose a date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Label className="text-dark text-[12px]">By SDG</Label>
          <Select>
            <SelectTrigger className="rounded-full bg-transparent h-[42px] border-subtle_text text-[12px] text-subtle_text focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Label className="text-dark text-[12px]">By target</Label>
          <Select>
            <SelectTrigger className="rounded-full h-[42px] bg-transparent text-[12px] border-subtle_text text-subtle_text focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-[175px] col-span-2">
          Filter
          <IconWrapper className="bg-transparent">
            <Filter size="25" color="#292925" variant="Bold" />
          </IconWrapper>
        </Button>
      </div>
    </>
  );
};

export default AdvancedSearch;
