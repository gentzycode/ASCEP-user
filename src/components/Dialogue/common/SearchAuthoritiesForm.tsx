import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchingError, FormInput } from "@/components/Democracy";
import { useSearchAuthorities } from "@/api/authorities";
import { useEffect } from "react";

interface SearchAuthoritiesFormProp {
  setsearchResult: React.Dispatch<
    React.SetStateAction<AuthorityType[] | undefined>
  >;
  resetButton: boolean;
  cancelButton: boolean;
}

const SearchAuthoritiesForm: React.FC<SearchAuthoritiesFormProp> = ({
  setsearchResult,
  resetButton,
  cancelButton,
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
    setValue,
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

  const resetSearch = async () => {
    await setValue("searchTerm", "");
    refetchSearch();
  };
  const handleCancel = async () => {
    await setValue("searchTerm", "");
    setsearchResult([]);
  };

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
          <div className="flex gap-4 flex-wrap">
            <Button
              className="h-12 text-base text-dark w-[150px] mt-2"
              disabled={!isValid || isSearching}
              isLoading={isSearching}
            >
              Search
            </Button>
            {resetButton && (
              <Button
                className="h-12 text-base text-dark w-[150px] mt-2 bg-transparent border border-dark"
                disabled={isSearching}
                type="button"
                onClick={resetSearch}
              >
                Reset Search
              </Button>
            )}
            {cancelButton && (
              <Button
                className="h-12 text-base text-dark w-[150px] mt-2 bg-transparent border border-dark"
                disabled={isSearching}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className="mt-20">
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
