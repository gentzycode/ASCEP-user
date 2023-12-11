
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { configOptions } from "../config";
import { z } from "zod";
import { GET_ALL_DEBATES_ENDPOINT, GET_ALL_SDGs_ENDPOINT, GET_DEBATE_COMMENTS_ENDPOINT, GET_DEBATE_INFO_ENDPOINT, PUBLISH_COMMENT_ENDPOINT, PUBLISH_DEBATES_ENDPOINT } from ".";
import { commentSchema, getDebateSchema, startDebateSchema } from "@/schemas/DebateSchema";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";

// PUBLISH DEBATE
export const usePublishDebate = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    return useMutation(
        (values: z.infer<typeof startDebateSchema>) => {
            return axios
                .post(PUBLISH_DEBATES_ENDPOINT, { ...values }, { headers: configOptions() })
                .then((res) => res.data as ResponseDataType);
        }, {
        onSuccess: (res) => {
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
            navigate(ROUTES.DEBATES_HOME_ROUTE);

        }
    }
    );

};

// PUBLISH COMMENT
export const usePublishComment = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (values: z.infer<typeof commentSchema>) => {
            return axios
                .post(PUBLISH_COMMENT_ENDPOINT, { ...values }, { headers: configOptions() })
                .then((res) => res.data as ResponseDataType);
        }, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("debateComments")
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
        }
    }
    );
}

// GET DEBATEs
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
        },
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