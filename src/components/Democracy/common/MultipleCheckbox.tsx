import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "../../ui/label";

const items = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "open",
    label: "open",
  },
  {
    value: "closed",
    label: "closed",
  },
  {
    value: "answered",
    label: "answered",
  },
] as const;
type Props = {
  value: string;
  label: string;
  sub?: string[];
};

const MultipleCheckbox = () => {
  const [, setValues] = useState<Props[] | []>([]);

  return (
    <>
      {items.map((item, index) => (
        <div className="flex items-center gap-2" key={index}>
          <Checkbox
          className="border-dark"
            onCheckedChange={(checked) => {
              return checked
                ? setValues((values) => [...values, item])
                : setValues((values) => {
                    return values.filter(
                      (value: Props) => value.value !== item.value
                    );
                  });
            }}
          />
          <Label className="text-[18px] text-subtle_text capitalize">
            {item.label}
          </Label>
        </div>
      ))}
    </>
  );
};

export default MultipleCheckbox;
