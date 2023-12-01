import { ArrowRoundRight, FilterIcon, ListViewIcon } from "@/Icons";
import { FormInput } from "@/components/custom";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import {
  CategoriesAndTarget_Data,
  Proposals_Data,
} from "@/utils/Democracy/Mock_Data";
import { useState } from "react";

interface ProposalsProps {}
const Proposals: React.FC<ProposalsProps> = () => {
  const [filterOption, setFilterOption] = useState<string>("Most active");
  const [view, setView] = useState<string>("card view");
  const filterOptions = ["Most active", "Highest rated", "Newest"];
  const bgColors = [
    "rgba(232, 67, 86, 0.10)",
    "rgba(221, 166, 58, 0.10)",
    "rgba(76,159, 56, 0.10)",
    "#292925",
  ];
  const textColors = ["#E84356", "#DDA63A", "#4C9F38", "#F9F6FB"];
  return (
    <DemocracyLayout>
      <div className=" md:max-w-[860px] mx-auto  text-center">
        <h1 className="tracking-[1px]  text-center font-sans text-dark text-[30px] md:text-[60px]">
          Proposals
        </h1>
        <p className="text-[24px] text-subtle_text my-6">
          Citizens' proposals are an opportunity for neighbours and collectives
          to decide directly how they want their city to be, after getting
          sufficient support and submitting to a citizens' vote.
        </p>

        <div className="flex justify-center items-center gap-8 flex-col md:flex-row">
          <Button className="w-[175px]">Get started</Button>
          <Button className="bg-transparent border-dark border-2 w-[175px]">
            Log in
          </Button>
        </div>
      </div>
      <div className="xl:flex gap-16 mt-[50px] max-w-[1200px] mx-auto">
        <div>
          <div className=" flex justify-start gap-[8px] items-center">
            <h4 className="text-[18px] font-400 w-full text-right mb-4">
              Advanced Search
            </h4>
          </div>
          <div className="flex justify-between gap-2">
            <ToggleGroup
              type="single"
              defaultValue={filterOption}
              onValueChange={(value) => {
                if (value) setFilterOption(value);
              }}
              className="gap-4"
            >
              {filterOptions.map((option, index) => (
                <ToggleGroupItem
                  value={option}
                  aria-label="Toggle bold"
                  key={index}
                  className="p-0"
                >
                  <Button
                    className={`${
                      filterOption === option
                        ? "text-primary bg-base-900 hover:bg-dark"
                        : "bg-[#fff] text-base-900 border-2 border-base-200 "
                    }  h-fit text-[14px] mx-0 `}
                  >
                    {option}
                  </Button>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {view === "list view" && (
              <button className="flex items-center text-[14px] tracking-[-0.28px] gap-[6px] bg-[#fff] border-light_grey border-2 px-4 py-2" onClick={()=>setView("card   view")}>
                <ListViewIcon />
                <span>List View</span>
              </button>
            )}
            {view === "card view" && (
              <button className="flex items-center text-[14px] tracking-[-0.28px] gap-[6px] bg-[#fff] border-light_grey border-2 px-4 py-2" onClick={()=>setView("list view")}>
                <ListViewIcon />
                <span>Card View</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <Label className="text-primary text-[12px]">By words</Label>
              <Input className="rounded-full h-[42px] bg-transparent border-subtle_text focus-visible:ring-0 focus-visible:ring-offset-0" />
            </div>
            <div className="col-span-1">
              <Label className="text-primary text-[12px]">By words</Label>
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
              <Label className="text-primary text-[12px]">By SDG</Label>
              <Select className="rounded-full h-[42px] border-subtle_text focus-visible:ring-0 focus-visible:ring-offset-0">
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
              <Label className="text-primary text-[12px]">By target</Label>
              <Select className="rounded-full h-[42px] border-subtle_text focus-visible:ring-0 focus-visible:ring-offset-0">
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
            <Button className="w-[175px]">
              Filter <FilterIcon />
            </Button>
          </div>

          <div className="grid grid-cols-1 my-10 gap-10">
            {view === "list view" &&
              Proposals_Data.map((proposal, index) => {
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
          <div className="grid grid-cols-1 my-10 gap-10">
            {view === "card view" &&
              Proposals_Data.map((proposal, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-1 flex flex-col lg:flex-row gap-3"
                  >
                    <div className="bg-[#FFFFFF] shadow-xl flex rounded-xl overflow-hidden">
                      <img src="/images/card-image.png" alt="image" />
                      <div className="p-8">
                        <div>
                          <h1 className="text-[20px] text-dark">
                            {proposal.title}
                          </h1>
                          <p className="text-[12px] text-base-400 my-3 ">
                            {proposal.date}
                          </p>
                          <p className="text-14px text-transparent h-[65px] pb-10 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
                            {proposal.content}
                          </p>
                        </div>

                        <div className="my-6 flex gap-[4px]">
                          {Array.from(["1", "2", "3", "+3"]).map(
                            (num, index) => {
                              return (
                                <Button
                                  className={`w-[50px] rounded-lg hover:bg-current`}
                                  key={index}
                                  style={{
                                    backgroundColor: `${bgColors[index]}`,
                                    color: `${textColors[index]}`,
                                    opacity: "10",
                                  }}
                                >
                                  {num}
                                </Button>
                              );
                            }
                          )}
                        </div>
                        <div className="flex gap-[8px] flex-wrap">
                          {proposal.tags.map((tag, index) => (
                            <Button
                              key={index}
                              className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-[#FFFFFF] shadow-xl flex lg:flex-col
                     justify-center items-center  rounded-xl px-4 gap-4 py-3 "
                    >
                      <Button
                        className={`${
                          proposal.percentage < 40
                            ? "bg-[rgba(232,67,86,0.10)]"
                            : proposal.percentage > 40 &&
                              proposal.percentage < 70
                            ? "bg-[rgba(221,166,58,0.10)]"
                            : "bg-[rgba(76,159,56,0.10)]"
                        } ${
                          proposal.percentage < 40
                            ? "text-[#E84356]"
                            : proposal.percentage > 40 &&
                              proposal.percentage < 70
                            ? "text-[#DDA63A]"
                            : "text-[#4C9F38]"
                        } w-[74px] h-[74px] hover:bg-inherit `}
                      >
                        {proposal.percentage}%
                      </Button>
                      <Button className="h-fit text-[12px] bg-dark text-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                        >
                          <path
                            d="M11.2072 12.181H7.54053V9.51432H12.2072V6.84766H14.8739V12.181H13.2072L12.2072 13.181L11.2072 12.181Z"
                            stroke="#F9F6FB"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.54053 1.51465H12.2072V9.51465H5.87386L4.54053 10.848L3.20719 9.51465H1.54053V1.51465Z"
                            stroke="#F9F6FB"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.20703 6.84831H6.20703M4.20703 4.18164H8.20703"
                            stroke="#F9F6FB"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span>5 support needed</span>
                      </Button>
                      <Button className="h-fit text-[16px] w-[140px] rounded-full">
                        Support
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="xl:max-w-[350px]">
          <h2 className="p-[16px] pt-0 pl-0 border-b-4 text-[18px] font-400 border-primary w-fit">
            Categories and Target
          </h2>

          <div className="flex flex-wrap gap-[9px] mt-[23px]">
            {CategoriesAndTarget_Data.map((item, index) => (
              <Button
                key={index}
                className="bg-transparent h-fit border-2 text-dark px-[20px] bg-light_grey text-[12px]"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DemocracyLayout>
  );
};
export default Proposals;
