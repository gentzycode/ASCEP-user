import { useGetAllDebates } from "@/api/democracy/debates";
import { filterDebateSchema } from "@/schemas/DebateSchema";
import { filterSchema } from "@/schemas/GeneralSchema";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseMutateFunction } from "react-query";
import * as z from "zod";

interface DebateContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  fetchingDebates: boolean;
  fetchingDebatesError: boolean;
  fetchedDebatesData: DebateDataType | undefined;
  refetchDebates: () => void;
  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterSchema>>
  >;
  getAllDebates: UseMutateFunction<
    any,
    unknown,
    {
      page: number;
      perPage: number;
      filter: z.infer<typeof filterDebateSchema>;
    }
  >;
  perPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const DebateContext = createContext<DebateContextType>({
  view: "",
  setView: () => {},
  fetchingDebates: false,
  fetchingDebatesError: false,
  fetchedDebatesData: undefined,
  refetchDebates: () => {},
  filterByButton: () => {},
  filterOptions: {},
  setFilterOptions: () => {},
  getAllDebates: () => {},
  perPage: 0,
  page: 0,
  setPage: () => {},
});

export const useDebateContext = () => useContext(DebateContext);

export default function DebateProvider({ children }: PropsWithChildren) {
  const initialFilter = {
    sdgs: [],
    specificSDG: undefined,
    specificTarget: undefined,
    targets: [],
    tags: [],
    mostactive: false,
    text: "",
    highestrating: false,
    newest: true,
    datetimeSpecific: "",
  };

  const {
    mutate: getAllDebates,
    isLoading: fetchingDebates,
    isError: fetchingDebatesError,
    data: fetchedDebatesData,
  } = useGetAllDebates();

  const [view, setView] = useState<string>("card-view");
  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof filterSchema>>(initialFilter);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);

  const getFiltersWithValues = () => {
    const entries = Object.entries(filterOptions);
    const filteredEntries = entries.filter(([_, value]) => {
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
    const isValidOption = debateFilterButtonOptions.some(
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

      const newFilter = { ...filterOptions, [value]: true };
      setFilterOptions(newFilter);
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllDebates({ page, perPage, filter: getFiltersWithValues() });
  }, [filterOptions, page]);

  const refetchDebates = () => {
    getAllDebates({ page, perPage, filter: getFiltersWithValues() });
  };

  return (
    <DebateContext.Provider
      value={{
        view,
        setView,
        fetchingDebates,
        fetchingDebatesError,
        fetchedDebatesData,
        refetchDebates,
        filterByButton,
        filterOptions,
        setFilterOptions,
        getAllDebates,
        perPage,
        page,
        setPage,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
}
