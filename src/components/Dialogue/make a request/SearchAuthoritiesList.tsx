import { SearchAuthoritiesCard } from "@/components/Dialogue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchAuthoritiesListProp {}
const SearchAuthoritiesList: React.FC<SearchAuthoritiesListProp> = () => {
  return (
    <div className="my-10">
      <div className="flex items-start justify-start gap-4 flex-wrap flex-col min-[500px]:flex-row">
        <Input
          placeholder="e.g Ministry of health"
          className="flex-1 h-11 rounded-full"
        />
        <Button className="h-11 text-base text-dark w-[150px]">Search</Button>
      </div>
      <p className="text-base text-text py-8">4 matching authorities</p>
      <div className="flex flex-col gap-10">
        <SearchAuthoritiesCard />
        <SearchAuthoritiesCard />
        <SearchAuthoritiesCard />
        <SearchAuthoritiesCard />
      </div>
    </div>
  );
};

export default SearchAuthoritiesList;
