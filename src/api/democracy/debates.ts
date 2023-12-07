
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { configOptions } from "../config";
import { z } from "zod";
import { GET_ALL_DEBATES_ENDPOINT, GET_ALL_SDGs_ENDPOINT } from ".";
import { getDebateSchema } from "@/schemas/DebateSchema";
// import { useDebateContext } from "@/contexts/DebateContext";

export const useGetAllDebates = () => {
    // const { setAllDebates } = useDebateContext()
    return useMutation(
        (values: z.infer<typeof getDebateSchema>) => {
            return axios
                .post(GET_ALL_DEBATES_ENDPOINT, { ...values }, { headers: configOptions() })
                .then((res) => res.data);
        },
        // {
        //     onSuccess: (res) => {
        //         console.log(res);
        //         setAllDebates(res.data)
        //     },
        // }
    );
};

export const useGetAllSDGs = () => {
    return useQuery(
        {
            queryKey: ["sdg"],
            queryFn: () => {
                return axios
                    .get(GET_ALL_SDGs_ENDPOINT)
                    .then((res) => res.data);
            },
            refetchOnWindowFocus: false,
        }
    );
};
