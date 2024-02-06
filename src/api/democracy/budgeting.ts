import axios from "axios";
import { useQuery } from "react-query";
import {
  GET_ALL_BUDGET_ENDPOINT,
  GET_BUDGET_PHASES_ENDPOINT,
  GET_CURRENT_BUDGET_ENDPOINT,
} from ".";

// GET BUDGET
export const useGetAllBudgets = (page: string) => {
  return useQuery({
    queryKey: ["all-budget"],
    queryFn: (): Promise<BudgetDataType> => {
      return axios
        .get(GET_ALL_BUDGET_ENDPOINT(page))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET CURRENT BUDGET
export const useGetCurrentBudget = () => {
  return useQuery({
    queryKey: ["current-budget"],
    queryFn: (): Promise<CurrentBudgetType> => {
      return axios
        .get(GET_CURRENT_BUDGET_ENDPOINT)
        .then((res) => res.data.data.budget);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET CURRENT BUDGET
export const useGetBudgetPhases = () => {
  return useQuery({
    queryKey: ["budget-phases"],
    queryFn: (): Promise<BudgetPhaseType[]> => {
      return axios
        .get(GET_BUDGET_PHASES_ENDPOINT)
        .then((res) => res.data.data.records);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
