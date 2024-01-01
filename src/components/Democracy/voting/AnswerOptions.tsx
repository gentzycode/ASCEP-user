import * as React from "react";
import { IoClose } from "react-icons/io5";
import { FormInput } from "..";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";

interface AnswerOptionsProps {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  error: string | null;
}

export default function AnswerOptions({
  options,
  setOptions,
  error,
}: AnswerOptionsProps) {
  const [option, setOption] = React.useState("");

  const handleAdd = (option: string) => {
    setOptions((options) => [...options, option]);
    setOption("");
  };

  const handleRemove = (tag: string) => {
    setOptions((options) =>
      options.filter((value) => value.toLowerCase() !== tag.toLowerCase())
    );
  };

  return (
    <div className="relative w-full space-y-4">
      <div className="flex gap-2 items-end">
        <FormInput
          name="option"
          description=""
          placeholder="Enter the option"
          onChange={(e) => setOption(e.target.value)}
          value={option}
        />
        <Button
          className="w-fit h-fit rounded-md"
          type="button"
          onClick={() => handleAdd(option)}
          disabled={option === ""}
        >
          Add Option
        </Button>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
      <div className="flex flex-wrap gap-2 ">
        {options.map((option, i) => (
          <SelectedTags option={option} key={i} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

interface SelectedTagsProps {
  option: string;
  handleRemove: (option: string) => void;
}

const SelectedTags = ({ option, handleRemove }: SelectedTagsProps) => {
  return (
    <div className="top-0 left-0 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {option}
      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(option)}
      />
    </div>
  );
};
