import { useQuery } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";

export const useGetAllCategories = () => {
  return useQuery(
    ["all-categories"],

    (): Promise<CollectionData[]> => {
      return axios.get(`${baseUrl}/category/all`).then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
