import * as React from "react";
import { IoClose } from "react-icons/io5";
import { FormInput } from "..";
import { Button } from "@/components/ui/button";

interface FormTagsProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FormTags({ tags, setTags }: FormTagsProps) {
  const [tag, setTag] = React.useState("");
  
  const handleAdd = (tag: string) => {
    setTags((tags) => [...tags, tag]);
    setTag("");
  };

  const handleRemove = (tag: string) => {
    setTags((tags) =>
      tags.filter((value) => value.toLowerCase() !== tag.toLowerCase())
    );
  };

  return (
    <div className="relative w-full space-y-4">
      <div className="flex gap-2 items-end">
        <FormInput
          name="tags"
          description=""
          placeholder="Enter the tag name you would like to use"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
        <Button
          className="w-fit h-fit rounded-md"
          type="button"
          onClick={() => handleAdd(tag)}
          disabled={tag === ""}
        >
          Add tag
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 ">
        {tags.map((tag, i) => (
          <SelectedTags tag={tag} key={i} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

interface SelectedTagsProps {
  tag: string;
  handleRemove: (tag: string) => void;
}

const SelectedTags = ({ tag, handleRemove }: SelectedTagsProps) => {
  return (
    <div className="top-0 left-0 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {tag}
      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(tag)}
      />
    </div>
  );
};
