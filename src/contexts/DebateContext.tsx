import { useGetAllDebates } from "@/api/democracy/debates";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DebateContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  fetchingDebates: boolean;
  fetchingDebatesError: boolean;
  fetchedDebatesData: DebateDataType | null;
  refetchDebates: () => void;
  filterByButton: (value: string) => void;
  searchText: string;
  setSearchtext: React.Dispatch<React.SetStateAction<string>>;
}

const DebateContext = createContext<DebateContextType>({
  view: "",
  setView: () => {},
  fetchingDebates: false,
  fetchingDebatesError: false,
  fetchedDebatesData: null,
  refetchDebates: () => {},
  filterByButton: () => {},
  searchText: "",
  setSearchtext: () => {},
});

export const useDebateContext = () => useContext(DebateContext);

export default function DebateProvider({ children }: PropsWithChildren) {
  const {
    mutate: getAllDebates,
    isLoading: fetchingDebates,
    isError: fetchingDebatesError,
    data: fetchedDebatesData,
  } = useGetAllDebates();

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
    // datetimeRange: "",
  };
  const [view, setView] = useState<string>("card-view");
  const [filterWithValues, setFilterWithValues] = useState({});
  const [filterOptions, setFilterOption] = useState(initialFilter);
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [searchText, setSearchtext] = useState<string>("");

  const getFiltersWithValues = () => {
    // filter the true values in the filterOptions
    const entries = Object.entries(filterOptions);
    const filteredEntries = entries.filter(([key, value]) => {
      // check if the value is truthy
      if (value) {
        // check if the value is an array
        if (Array.isArray(value)) {
          // return true if the array is not empty
          return value.length > 0;
        } else {
          // return true if the value is not an array
          return true;
        }
      } else {
        // return false if the value is falsy
        return false;
      }
    });
    const filteredObject = Object.fromEntries(filteredEntries);

    // set it as the value of the filterWithValues
    setFilterWithValues(filteredObject);
  };

  //   const filterByButton = (value: string) => {
  //     const isValidOption = debateFilterButtonOptions.some(
  //       (option) => option.value === value
  //     );
  //     if (isValidOption) {
  //       const filter = { [value]: true };
  //       getAllDebates({ page, perPage, filter });
  //     } else {
  //       return;
  //     }
  //   };

  const filterByButton = (value: string) => {
    const isValidOption = debateFilterButtonOptions.some(
      (option) => option.value === value
    );

    if (isValidOption) {
      // Create the new filter object
      const newFilter = { ...initialFilter, [value]: true };

      // Set the new filterOptions state
      setFilterOption(newFilter);

      // Call getAllDebates with the new filter object
      getAllDebates({ page, perPage, filter: newFilter });
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllDebates({ page: 1, perPage: 20, filter: {} });
  }, []);

  useEffect(() => {
    getFiltersWithValues();
  }, [filterOptions]);

  useEffect(() => {
    getAllDebates({ page, perPage: 20, filter: filterWithValues });
  }, [filterWithValues]);

  const refetchDebates = () => {
    getAllDebates({ page: 1, perPage: 20, filter: filterWithValues });
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
        searchText,
        setSearchtext,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
}
