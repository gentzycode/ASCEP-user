import { useQuery } from "react-query";
import {
  GET_ALL_AUTHORITIES_ENDPOINT,
  GET_AUTHORITY_INFO_ENDPOINT,
  SEARCH_AUTHORITIES_ENDPOINT,
} from "./dialogue";
import axios from "axios";

// GET ALL AUTHORITIES
export const useGetAllAuthorities = () => {
  return useQuery({
    queryFn: (): Promise<AuthorityType[]> => {
      return axios
        .get(GET_ALL_AUTHORITIES_ENDPOINT)
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
};

// GET AUTHORITY INFO
export const useGetAuthorityInfo = (authorityId: string) => {
  return useQuery({
    queryKey: ["authority-info"],
    queryFn: (): Promise<AuthorityDataType> => {
      return axios
        .get(GET_AUTHORITY_INFO_ENDPOINT(authorityId))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// SEARCH AUTHORITIES
export const useSearchAuthorities = (searchTerm: string) => {
  return useQuery({
    queryKey: ["all-authorities"],
    queryFn: (): Promise<AuthorityType[]> => {
      return axios
        .get(SEARCH_AUTHORITIES_ENDPOINT(searchTerm))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
