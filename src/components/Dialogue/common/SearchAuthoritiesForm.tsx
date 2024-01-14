import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchingError, FormInput } from "@/components/Democracy";
import { useSearchAuthorities } from "@/api/authorities";
import { useEffect } from "react";

interface SearchAuthoritiesFormProp {
  setsearchResult: React.Dispatch<React.SetStateAction<AuthorityType[] | undefined>>;
}

const SearchAuthoritiesForm: React.FC<SearchAuthoritiesFormProp> = ({
  setsearchResult,
}) => {
  const SearchAuthoritiesSchema = z.object({
    searchTerm: z
      .string({ required_error: "Please enter an authourity" })
      .refine((value) => value.trim() !== "", {
        message: "Please enter an authourity",
      }),
  });

  const form = useForm<z.infer<typeof SearchAuthoritiesSchema>>({
    resolver: zodResolver(SearchAuthoritiesSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;

  const value = watch("searchTerm");

  const {
    data: searchResult,
    isFetching: isSearching,
    isError: errorSearching,
    refetch: refetchSearch,
  } = useSearchAuthorities(value);

  async function onSubmit(values: z.infer<typeof SearchAuthoritiesSchema>) {
    refetchSearch();
  }

  useEffect(() => {
    if (searchResult) {
      setsearchResult(searchResult);
    }
  }, [searchResult]);

  return (
    <div className="my-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-start flex-wrap gap-4 flex-col w-full lg:flex-row"
        >
          <div className="flex-1 w-full">
            <FormInput
              name="searchTerm"
              label=""
              placeholder="e.g Ministry of...."
              errors={errors}
              control={control}
            />
          </div>
          <Button
            className="h-12 text-base text-dark w-[150px] mt-2"
            disabled={!isValid || isSearching}
            isLoading={isSearching}
          >
            Search
          </Button>
        </form>
      </Form>
      <div className="mt-20">
        {/* {searchResult && (
          <p className="text-base text-text">
            {searchResult.length} matching authorities
          </p>
        )} */}

        {/* ERROR */}
        {errorSearching && !searchResult && (
          <FetchingError
            message="Error fetching Request"
            refetching={isSearching}
            retryFunction={() => refetchSearch()}
          />
        )}
      </div>
    </div>
  );
};

export default SearchAuthoritiesForm;
