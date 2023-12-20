import { useQuery } from "react-query";
import { GET_ALL_WARDS_ENDPOINT } from "./democracy";
import axios from "axios";

//GET ALL WARDS
export const useGetAllWards = () => {
    return useQuery(
        ["wards"],
        (): Promise<WardsType[]> => {
            return axios
                .get(GET_ALL_WARDS_ENDPOINT)
                .then((res) => res.data.data);
        },
        {
            refetchOnWindowFocus: false,
        },
    );
};