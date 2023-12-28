import { useGetAllInitiatives } from "@/api/democracy/initiatives";
import { filterSchema } from "@/schemas/GeneralSchema";
import { filterProposalSchema } from "@/schemas/ProposalSchema";
import { initiativeFilterButtonOptions } from "@/utils/Democracy/Initiatives";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseMutateFunction } from "react-query";
import * as z from "zod";

interface InitiativeContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  fetchingInitiatives: boolean;
  fetchingInitiativeError: boolean;
  fetchedInitiativeData: InitiativeDataType | undefined;
  refetchInitiatives: () => void;
  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterSchema>>
  >;
  getAllInitiatives: UseMutateFunction<
    any,
    unknown,
    {
      page: number;
      perPage: number;
      filter: z.infer<typeof filterProposalSchema>;
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
  all: false,
  text: "",
  opened: false,
  closed: false,
  answered: false,
  newest: true,
  datetimeSpecific: "",
};
const InitiativeContext = createContext<InitiativeContextType>({
  view: "",
  setView: () => {},
  fetchingInitiatives: false,
  fetchingInitiativeError: false,
  fetchedInitiativeData: undefined,
  refetchInitiatives: () => {},
  filterByButton: () => {},
  filterOptions: initialFilter,
  setFilterOptions: () => {},
  getAllInitiatives: () => {},
  perPage: 0,
  page: 0,
  setPage: () => {},
});

export const useInitiativeContext = () => useContext(InitiativeContext);

export default function InitiativeProvider({ children }: PropsWithChildren) {
  const {
    mutate: getAllInitiatives,
    isLoading: fetchingInitiatives,
    isError: fetchingInitiativeError,
    data: fetchedInitiativeData,
  } = useGetAllInitiatives();

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
    const isValidOption = initiativeFilterButtonOptions.some(
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
      setFilterOptions({});
    }
  };

  useEffect(() => {
    getAllInitiatives({ page, perPage, filter: getFiltersWithValues() });
  }, [filterOptions]);

  const refetchInitiatives = () => {
    getAllInitiatives({ page, perPage, filter: { newest: true } });
  };

  return (
    <InitiativeContext.Provider
      value={{
        view,
        setView,
        fetchingInitiatives,
        fetchingInitiativeError,
        fetchedInitiativeData,
        refetchInitiatives,
        filterByButton,
        filterOptions,
        setFilterOptions,
        getAllInitiatives,
        perPage,
        page,
        setPage,
      }}
    >
      {children}
    </InitiativeContext.Provider>
  );
}
