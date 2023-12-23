import { configOptions } from "../config";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProposalSchema, proposalCommentSchema, proposalTopicCommentSchema, proposalTopicSchema, voteProposalCommentSchema } from "@/schemas/ProposalSchema";
import axios from "axios";
import { GET_ALL_PROPOSALS_ENDPOINT, GET_ALL_PROPOSAL_TOPICS_ENDPOINT, GET_PROPOSAL_COMMENTS_ENDPOINT, GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT, GET_PROPOSAL_INFO_ENDPOINT, GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT, GET_PROPOSAL_TOPIC_INFO_ENDPOINT, PUBLISH_PROPOSALS_ENDPOINT, PUBLISH_PROPOSAL_COMMENT_ENDPOINT, PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT, PUBLISH_PROPOSAL_TOPIC_ENDPOINT, SUPPORT_PROPOSAL_ENDPOINT, VOTE_PROPOSAL_COMMENT_ENDPOINT, VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT } from ".";


// PUBLISH PROPOSAL
export const usePublishProposal = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    return useMutation(
        (values: FormData): Promise<ResponseDataType> => {
            return axios
                .post(PUBLISH_PROPOSALS_ENDPOINT, values, {
                    headers:
                        { ...configOptions(), "Content-Type": "multipart/form-data" }
                })
                .then((res) => res.data);
        }, {
        onSuccess: (res) => {
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
            navigate(ROUTES.PROPOSALS_HOME_ROUTE);

        }
    }
    );
};
// PUBLISH PROPOSAL COMMENT
export const usePublishProposalComment = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (values: z.infer<typeof proposalCommentSchema>) => {
            return axios
                .post(PUBLISH_PROPOSAL_COMMENT_ENDPOINT, { ...values }, { headers: configOptions() })
                .then((res) => res.data as ResponseDataType);
        }, {
        onSuccess: (res, variables) => {
            queryClient.invalidateQueries("proposal-comments")
            queryClient.invalidateQueries({ queryKey: ["proposal-info", variables.proposal_id] })
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
        }
    }
    );
}
// GET PROPOSAL
export const useGetAllProposals = () => {
    return useMutation(
        ["get-proposals"],
        (values: z.infer<typeof getProposalSchema>): Promise<ProposalDataType> => {
            return axios
                .post(GET_ALL_PROPOSALS_ENDPOINT, { ...values })
                .then((res) => res.data.data);
        }
    );

};

// GET PROPOSAL INFO
export const useGetProposalInfo = (proposalId: number) => {
    return useQuery(
        {
            queryKey: ["proposal-info", proposalId],
            queryFn: (): Promise<ProposalType> => {
                return axios
                    .get(GET_PROPOSAL_INFO_ENDPOINT(proposalId))
                    .then((res) => res.data.data.proposal);
            },
            retry: false,
            refetchOnWindowFocus: false
        },

    );
};

// GET PROPOSAL COMMENTS
export const useGetProposalComments = (proposalId: number, page: number, filter?: string) => {
    return useQuery(
        {
            queryKey: ["proposal-comments"],
            queryFn: (): Promise<CommentDataType> => {
                return axios
                    .get(GET_PROPOSAL_COMMENTS_ENDPOINT(proposalId, page, filter))
                    .then((res) => res.data.data);
            },
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    );
};

// VOTE PROPOSAL COMMENT
export const useVoteProposalComment = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (values: z.infer<typeof voteProposalCommentSchema>): Promise<ResponseDataType> => {
            return axios
                .post(VOTE_PROPOSAL_COMMENT_ENDPOINT(values.type, values.comment_id))
                .then((res) => res.data);
        },
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["proposal-comments"] })
                toast({
                    title: "Success!",
                    variant: "success",
                    description: res.message
                })
            }
        }
    );
};
// SUPPORT PROPOSAL 
export const useSupportProposal = (proposalId: number) => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (): Promise<ResponseDataType> => {
            return axios
                .patch(SUPPORT_PROPOSAL_ENDPOINT(proposalId))
                .then((res) => res.data);
        },
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["proposal-info", proposalId] })
                toast({
                    title: "Success!",
                    variant: "success",
                    description: res.message
                })
            }
        }
    );
};


//PROPOSAL COMMUNITY
//publish proposal topic
export const usePublishProposalTopic = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    return useMutation(
        (values: z.infer<typeof proposalTopicSchema>): Promise<ResponseDataType> => {
            return axios
                .post(PUBLISH_PROPOSAL_TOPIC_ENDPOINT, values, {
                    headers: configOptions()
                })
                .then((res) => res.data);
        }, {
        onSuccess: (res, variables) => {
            console.log("variables", variables);
            queryClient.invalidateQueries({ queryKey: ["get-proposal-topics"] })
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
            if (variables.id) {
                queryClient.invalidateQueries("get-proposal-topic-info")
                // navigate(ROUTES.PROPOSAL_TOPIC_INFO_ROUTE(variables.id));
            }
        }
    }
    );
};

// get all proposal topics
export const useGetAllProposalTopics = (page: number, proposalId: number, filter: string) => {
    return useQuery(
        ["get-proposal-topics", page, proposalId, filter],
        (): Promise<ProposalTopicDataType> => {
            return axios
                .get(GET_ALL_PROPOSAL_TOPICS_ENDPOINT(page, proposalId, filter), { headers: configOptions() })
                .then((res) => res.data.data);
        },
        {
            retry: false,
            refetchOnWindowFocus: false,
            enabled: false
        }
    );

};
// get proposal topic info
export const useGetProposalTopicInfo = (topicId: number | string) => {
    return useQuery(
        ["get-proposal-topic-info", topicId],
        (): Promise<ProposalTopicType> => {
            return axios
                .get(GET_PROPOSAL_TOPIC_INFO_ENDPOINT(topicId))
                .then((res) => res.data.data.topic);
        },
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

};

// publish proposal topic comment
export const usePublishProposalTopicComment = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (values: z.infer<typeof proposalTopicCommentSchema>): Promise<ResponseDataType> => {
            return axios
                .post(PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT, { ...values }, { headers: configOptions() })
                .then((res) => res.data);
        }, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("proposal-topic-comments")
            queryClient.invalidateQueries("get-proposal-topic-info")
            toast({
                title: "Success!",
                variant: "success",
                description: res.message
            })
        }
    }
    );
}
// get proposal topic comments
export const useGetProposalTopicComments = (topicId: number, page: number, filter?: string) => {
    return useQuery(
        {
            queryKey: ["proposal-topic-comments"],
            queryFn: (): Promise<CommentDataType> => {
                return axios
                    .get(GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT(topicId, page, filter))
                    .then((res) => res.data.data);
            },
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    );
};

// vote proposal topic comment
export const useVoteProposalTopicComment = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    return useMutation(
        (values: z.infer<typeof voteProposalCommentSchema>): Promise<ResponseDataType> => {
            return axios
                .post(VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT(values.type, values.comment_id))
                .then((res) => res.data);
        },
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["proposal-topic-comments"] })
                toast({
                    title: "Success!",
                    variant: "success",
                    description: res.message
                })
            }
        }
    );
};
// get all proposal community members
export const useGetProposalCommunityMembers = (proposalId: number) => {
    return useQuery(
        ["get-proposal-community-member"],
        (): Promise<ProposalCommunityMemberType[]> => {
            return axios
                .get(GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT(proposalId), { headers: configOptions() })
                .then((res) => res.data.data);
        },
        {
            retry: false,
            refetchOnWindowFocus: false,

        }
    );

};