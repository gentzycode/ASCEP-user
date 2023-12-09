
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { configOptions } from "../config";
import { z } from "zod";
import { GET_ALL_DEBATES_ENDPOINT, GET_ALL_SDGs_ENDPOINT, GET_DEBATE_COMMENTS_ENDPOINT, GET_DEBATE_INFO_ENDPOINT } from ".";
import { getDebateSchema } from "@/schemas/DebateSchema";



export const useGetAllDebates = () => {
    return useMutation(
        (values: z.infer<typeof getDebateSchema>) => {
            return axios
                .post(GET_ALL_DEBATES_ENDPOINT, { ...values })
                .then((res) => res.data.data);
        }
    );

};
// GET DEBATE INFO
export const useGetDebateInfo = (debateId: number) => {
    return useQuery(
        {
            queryFn: () => {
                return axios
                    .get(GET_DEBATE_INFO_ENDPOINT(debateId))
                    .then((res) => res.data.data.debate);
            },
            staleTime: 0,
            refetchOnWindowFocus: false,
        }
    );
};
// GET DEBATE COMMENTS
export const useGetDebateComments = (debateId: number, page: number) => {
    return useQuery(
        {
            queryKey: ["debateComments"],
            queryFn: () => {
                return axios
                    .get(GET_DEBATE_COMMENTS_ENDPOINT(debateId, page))
                    .then((res) => res.data.data);
            },
            staleTime: 0,
            refetchOnWindowFocus: false,
        }
    );
};
//GET ALL SDGs
export const useGetAllSDGs = () => {
    return useQuery(
        ["sdg"],
        () => {
            return axios
                .get(GET_ALL_SDGs_ENDPOINT)
                .then((res) => res.data.data);
        },
        {
            refetchOnWindowFocus: false,
        },
    );
};