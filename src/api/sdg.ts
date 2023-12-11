import { useQuery } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";

export const useGetAllSDGs = () => {
  return useQuery(
    ["all-sdgs"],
    (): Promise<SDGData> => {
      return axios.get(`${baseUrl}/sdg/all`).then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
