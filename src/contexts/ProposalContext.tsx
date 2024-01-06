import { useGetAllProposals } from "@/api/democracy/proposals";
import { filterSchema } from "@/schemas/GeneralSchema";
import { filterProposalSchema } from "@/schemas/ProposalSchema";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
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
  fetchingProposals: boolean;
  fetchingProposalError: boolean;
  fetchedProposalData: ProposalDataType | undefined;
  refetchProposals: () => void;
  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterSchema>>
  >;
  getAllProposals: UseMutateFunction<
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

const ProposalContext = createContext<ProposalContextType>({
  view: "",
  setView: () => {},
  fetchingProposals: false,
  fetchingProposalError: false,
  fetchedProposalData: undefined,
  refetchProposals: () => {},
  filterByButton: () => {},
  filterOptions: {},
  setFilterOptions: () => {},
  getAllProposals: () => {},
  perPage: 0,
  page: 0,
  setPage: () => {},
});

export const useProposalContext = () => useContext(ProposalContext);

export default function ProposalProvider({ children }: PropsWithChildren) {
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
    mutate: getAllProposals,
    isLoading: fetchingProposals,
    isError: fetchingProposalError,
    data: fetchedProposalData,
  } = useGetAllProposals();

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
    const isValidOption = proposalFilterButtonOptions.some(
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
    getAllProposals({ page, perPage, filter: getFiltersWithValues() });
  }, [filterOptions, page]);

  const refetchProposals = () => {
    getAllProposals({ page, perPage, filter: getFiltersWithValues() });
  };
  return (
    <ProposalContext.Provider
      value={{
        view,
        setView,
        fetchingProposals,
        fetchingProposalError,
        fetchedProposalData,
        refetchProposals,
        filterByButton,
        filterOptions,
        setFilterOptions,
        getAllProposals,
        perPage,
        page,
        setPage,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}
