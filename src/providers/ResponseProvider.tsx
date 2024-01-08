import { useGetAllReports } from "@/api/response";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ResponseContextType {
  reports: ReportData[];
  isLoading: boolean;
  filterDate: (arg: string | null) => void;
  filterLocation: (arg: string | null) => void;
  filterCategory: (arg: string | null) => void;
}

const ResponseContext = createContext<ResponseContextType>({
  reports: [],
  isLoading: false,
  filterDate: () => {},
  filterLocation: () => {},
  filterCategory: () => {},
});

export const useResponseContext = () => useContext(ResponseContext);

interface ResponseFilter {
  location: string | null;
  start_date: string | null;
  category: string | null;
}

const filtersDefault: ResponseFilter = {
  location: null,
  start_date: null,
  category: null,
};
export default function RepsonseProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState(filtersDefault);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filtersString, setFiltersString] = useState("");

  const { data, isLoading } = useGetAllReports({
    filtersString,
  });

  useEffect(() => {
    if (data?.length) {
      setReports(data);
    }
  }, [data]);

  useEffect(() => {
    // Create an array of key-value pairs for non-null filter properties
    const filterEntries = Object.entries(filters).filter(
      ([, value]) => value !== null
    );

    // Construct the filtersString by joining key-value pairs with '&'
    const newFiltersString = filterEntries
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Update the state with the new filtersString
    setFiltersString(newFiltersString ? `?${newFiltersString}` : "");
  }, [filters]);

  console.log(filtersString);

  const filterDate = (arg: string | null) => {
    setFilters({ ...filters, start_date: arg });
  };

  const filterLocation = (arg: string | null) => {
    setFilters({ ...filters, location: arg });
  };

  const filterCategory = (arg: string | null) => {
    setFilters({ ...filters, category: arg });
  };

  return (
    <ResponseContext.Provider
      value={{ isLoading, reports, filterCategory, filterDate, filterLocation }}
    >
      {children}
    </ResponseContext.Provider>
  );
}
