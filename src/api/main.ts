import { useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";

export const useGetRecommendations = () => {
  return useQuery(
    ["recommendations"],
    (): Promise<Recommendation[]> => {
      return axios
        .get(`${baseUrl}/recommendation/all?page=1&perPage=4`)
        .then((res) => res.data?.data?.recommendations || []);
    },
    {}
  );
};
