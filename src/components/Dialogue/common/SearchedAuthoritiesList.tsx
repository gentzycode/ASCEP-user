import { SearchAuthoritiesCard } from "..";

interface SearchedAuthoritiesListProp {
  searchResult: AuthorityType[] | undefined;
}
const SearchedAuthoritiesList: React.FC<SearchedAuthoritiesListProp> = ({
  searchResult,
}) => {
  return (
    <div className="space-y-6">
      {searchResult && (
        <p className="text-base text-text">
          {searchResult.length} matching authorities
        </p>
      )}
      <div className="flex flex-col gap-10">
        {searchResult &&
          searchResult?.map((authority) => (
            <SearchAuthoritiesCard authority={authority} key={authority.name} />
          ))}
      </div>
    </div>
  );
};

export default SearchedAuthoritiesList;
