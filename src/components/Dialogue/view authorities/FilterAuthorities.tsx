import { Button } from "@/components/ui/button";

const FilterAuthorities = () => {
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-subtle_text text-base lg:text-lg">
          Beginning with
        </h2>
        {/* ALPHABET */}
        <div className="flex justify-start gap-1 flex-wrap ">
          {alphabet.map((letter) => (
            <Button
              className="h-5 w-5 text-sm text-subtle_text bg-transparent rounded-none p-0"
              key={letter}
              onClick={() => {}}
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>

      {/* DEPARTMENTS */}
      <div className="space-y-2">
        <h2 className="text-subtle_text text-base lg:text-lg">Departments</h2>
        <ul className="list-none text-subtitle_text">
          <li>Ministerial departments</li>
          <li>Advisory bodies</li>
          <li>Agencies</li>
        </ul>
      </div>

      {/* STATUS */}
      <div className="space-y-2">
        <h2 className="text-subtle_text text-base lg:text-lg">Status</h2>
        <ul className="list-none text-subtitle_text">
          <li>Active</li>
          <li>In-active</li>
        </ul>
      </div>
    </div>
  );
};

export default FilterAuthorities;
