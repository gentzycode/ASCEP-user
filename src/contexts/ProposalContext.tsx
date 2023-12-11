import { useGetAllDebates } from "@/api/democracy/debates";
import { filterDebateSchema } from "@/schemas/DebateSchema";
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

interface ProposalContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  fetchingDebates: boolean;
  fetchingDebatesError: boolean;
  fetchedDebatesData: DebateDataType | null;
  refetchDebates: () => void;
  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterDebateSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterDebateSchema>>
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
};
const ProposalContext = createContext<ProposalContextType>({
  view: "",
  setView: () => {},
  fetchingDebates: false,
  fetchingDebatesError: false,
  fetchedDebatesData: null,
  refetchDebates: () => {},
  filterByButton: () => {},
  filterOptions: initialFilter,
  setFilterOptions: () => {},
  getAllDebates: () => {},
  perPage: 0,
});

export const useProposalContext = () => useContext(ProposalContext);

export default function ProposalProvider({ children }: PropsWithChildren) {
  const {
    mutate: getAllDebates,
    isLoading: fetchingDebates,
    isError: fetchingDebatesError,
    data: fetchedDebatesData,
  } = useGetAllDebates();

  const [view, setView] = useState<string>("card-view");
  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof filterDebateSchema>>(initialFilter);
  const [page] = useState<number>(1);
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

  const fetchDebate = () => {
    getAllDebates({ page, perPage, filter: getFiltersWithValues() });
  };

  useEffect(() => {
    getAllDebates({ page, perPage, filter: getFiltersWithValues() });
  }, []);

  useEffect(() => {
    fetchDebate();
  }, [filterOptions]);

  const refetchDebates = () => {
    getAllDebates({ page, perPage, filter: {} });
  };
  return (
    <ProposalContext.Provider
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
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}
