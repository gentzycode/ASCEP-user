import { ArrowRoundRight, FilterIcon, ListViewIcon } from "@/Icons";
import FilterButtons from "@/components/Democracy/FilterButtons";
import InitiativesCardViewCard from "@/components/Democracy/InitiativesCardViewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { SDG_Images } from "@/utils/Democracy/Images";
import { Initiatives_Data, Proposals_Data } from "@/utils/Democracy/Mock_Data";
import { useState } from "react";
const Initiatives = () => {
  const [filterOption, setFilterOption] = useState<string>("Most active");
  const [view, setView] = useState<string>("card view");
  const [advanceSearch, setAdvanceSearch] = useState<boolean>(false);
  const filterOptions = [
    "Recent",
    "Most Signed",
    "Random",
    "Signed",
    "Publish",
  ];
  return (
    <DemocracyLayout>
      {/* HEADING */}
      <div className="flex justify-between flex-col xl:flex-row max-w-[1100px] gap-8">
        <h1 className="tracking-[1px]  text-center font-sans text-dark text-[30px] md:text-[60px]">
          Initiatives
        </h1>
        <div className="flex justify-center items-center gap-8 md:flex-row">
          <Button className="w-[175px]">Get started</Button>
          <Button className="bg-transparent border-dark border-2 w-[175px]">
            Log in
          </Button>
        </div>
      </div>
      {/* FILTER */}
      <div className="xl:flex gap-16 mt-[60px] max-w-[1200px] mx-auto">
        {/* START OF LEFT SIDE */}
        <div className="flex-1 max-w-[1200px]">
          <div className=" flex justify-between md:justify-end gap-[8px] items-center  mb-4">
            <div className="md:hidden">
              <button
                className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-2"
                onClick={() =>
                  view === "card view"
                    ? setView("list view")
                    : setView("card view")
                }
              >
                <ListViewIcon />
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

          <div className="flex justify-between gap-2 mb-2">
            <FilterButtons
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              filterOptions={filterOptions}
            />
            <div className="hidden md:block">
              <button
                className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-2"
                onClick={() =>
                  view === "card view"
                    ? setView("list view")
                    : setView("card view")
                }
              >
                <ListViewIcon />
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
              Filter <FilterIcon />
            </Button>
          </div>
          {/* LIST VIEW */}
          {view === "list view" && (
            <div className="grid grid-cols-1 my-10 gap-10">
              {Proposals_Data.map((proposal, index) => {
                return (
                  <div key={index} className="col-span-1">
                    <Button
                      className="bg-[#F9F6FB] hover:bg-transparent
                     w-full h-fit text-[16px]  md:text-[24px] p-[24px] flex justify-between gap-4
                      items-center shadow-xl font-sans self-stretch"
                    >
                      <span className="whitespace-pre-wrap text-left flex-auto">
                        {proposal.title}
                      </span>
                      <ArrowRoundRight />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          {/* CARD VIEW */}
          {view === "card view" && (
            <div className="grid grid-cols-2 my-10 gap-4">
              {Initiatives_Data.map((initiatives, index) => (
                <InitiativesCardViewCard
                  initiatives={initiatives}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* START OF RIGHT SIDE */}
        <div className="max-w-[400px]">
          {/*  Filters by SDG  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6">
            Status
          </h2>
          <div className="grid grid-cols-4 gap-[9px] justify-start max-w-[500px] mt-[23px]">
            
          </div>

          {/*  Filters by SDG  */}
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit my-6">
            Filters by SDG
          </h2>
          <div className="grid grid-cols-4 gap-[9px] justify-start max-w-[500px] mt-[23px]">
            {SDG_Images.map((item, index) => (
              <Button
                key={index}
                className="bg-transparent h-fit p-0 hover:bg-transparent flex justify-start"
              >
                <img src={item} alt={index.toString()} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DemocracyLayout>
  );
};

export default Initiatives;
