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
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
interface AdvancedSearchProps {
  filterButtonOptions: FilterButtonOptionsType[];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  filterByButton: (value: string) => void;
  setSearchtext: React.Dispatch<React.SetStateAction<string>>;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filterButtonOptions,
  view,
  setView,
  filterByButton,
  setSearchtext,
}) => {
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const { sdgData } = useAppContext();
  return (
    <>
      <div className=" flex justify-between md:justify-end gap-[8px] items-center  mb-4">
        <div className="md:hidden">
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card-view" ? setView("list-view") : setView("card-view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="20" color="#292925" />
            </IconWrapper>
            <span>{view === "card-view" ? "List View" : "Card View"}</span>
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
          filterButtonOptions={filterButtonOptions}
          filterByButton={filterByButton}
        />
        <div className="hidden md:block">
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card-view" ? setView("list-view") : setView("card-view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="25" color="#292925" />
            </IconWrapper>
            <span>{view === "card-view" ? "List View" : "Card View"}</span>
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
          <Input
            className="rounded-full h-[42px] bg-transparent border-subtle_tex focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setSearchtext(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <Label className="text-dark text-[12px]">By date</Label>
          <Input type="date" className="text-subtle_text" />
        </div>
        <div className="col-span-1">
          <Label className="text-dark text-[12px]">By SDG</Label>
          <Select>
            <SelectTrigger className="rounded-full bg-transparent h-[42px] border-subtle_text text-[12px] text-subtle_text focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              {sdgData?.data.map((sdg) => (
                <SelectItem value={sdg.id} key={sdg.id}>
                  {sdg.title}
                </SelectItem>
              ))}
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
              {[
                {
                  id: 3,
                  code: "2.1",
                  description: "Universal Access to Safe and Nutritious Food",
                  sdgs_id: 2,
                },
                {
                  id: 4,
                  code: "2.2",
                  description: "End All Forms of Malnitrition",
                  sdgs_id: 2,
                },
              ].map((target) => (
                <SelectItem value={target.code} key={target.id}>
                  {target.description}
                </SelectItem>
              ))}
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
