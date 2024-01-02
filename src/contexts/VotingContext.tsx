import { useGetAllPolls } from "@/api/democracy/voting";
import { filterSchema } from "@/schemas/GeneralSchema";
import { filterPollSchema } from "@/schemas/VotingSchema";
import { votingFilterButtonOptions } from "@/utils/Democracy/Voting";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseMutateFunction } from "react-query";
import * as z from "zod";

interface VotingContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  fetchingPolls: boolean;
  fetchingPollsError: boolean;
  fetchedPollsData: VotingDataType | undefined;
  refetchPolls: () => void;
  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterSchema>>
  >;
  getAllPolls: UseMutateFunction<
    any,
    unknown,
    {
      page: number;
      perPage: number;
      filter: z.infer<typeof filterPollSchema>;
    }
  >;
  perPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const initialFilter = {
  sdgs: [],
  specificSDG: undefined,
  specificTarget: undefined,
  targets: [],
  tags: [],
  mostactive: false,
  text: "",
  highestrating: false,
  newest: false,
  datetimeSpecific: "",
  status: "upcoming",
};
const VotingContext = createContext<VotingContextType>({
  view: "",
  setView: () => {},
  fetchingPolls: false,
  fetchingPollsError: false,
  fetchedPollsData: undefined,
  refetchPolls: () => {},
  filterByButton: () => {},
  filterOptions: initialFilter,
  setFilterOptions: () => {},
  getAllPolls: () => {},
  perPage: 0,
  page: 0,
  setPage: () => {},
});

export const useVotingContext = () => useContext(VotingContext);

export default function VotingProvider({ children }: PropsWithChildren) {
  const {
    mutate: getAllPolls,
    isLoading: fetchingPolls,
    isError: fetchingPollsError,
    data: fetchedPollsData,
  } = useGetAllPolls();

  const [view, setView] = useState<string>("card-view");

  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof filterSchema>>(initialFilter);

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);

  const getFiltersWithValues = () => {
    const entries = Object.entries(filterOptions);
    const filteredEntries = entries.filter(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    const filteredObject = Object.fromEntries(filteredEntries);

    return filteredObject;
  };

  const filterByButton = (value: string) => {
    const isValidOption = votingFilterButtonOptions.some(
      (option) => option.value === value
    );

    const filterOptionsWithAssertion = filterOptions as {
      [key: string]: any;
    };
    if (isValidOption) {
      Object.keys(filterOptionsWithAssertion).forEach((key) => {
        if (filterOptionsWithAssertion[key] === true) {
          filterOptionsWithAssertion[key] = false;
        }
      });

      const newFilter = { ...filterOptions, status: value };
      setFilterOptions(newFilter);
    } else {
      setFilterOptions({});
    }
  };

  useEffect(() => {
    getAllPolls({ page, perPage, filter: getFiltersWithValues() });
  }, [filterOptions]);

  const refetchPolls = () => {
    getAllPolls({ page, perPage, filter: { status: "upcoming" } });
  };
  return (
    <VotingContext.Provider
      value={{
        view,
        setView,
        fetchingPolls,
        fetchingPollsError,
        fetchedPollsData,
        refetchPolls,
        filterByButton,
        filterOptions,
        setFilterOptions,
        getAllPolls,
        perPage,
        page,
        setPage,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}
