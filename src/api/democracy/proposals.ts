import { configOptions } from "../config";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  getProposalSchema,
  proposalCommentSchema,
  proposalTopicCommentSchema,
  proposalTopicSchema,
  voteProposalCommentSchema,
} from "@/schemas/ProposalSchema";
import axios from "axios";
import {
  DELETE_PROPOSAL_DOC_ENDPOINT,
  DELETE_PROPOSAL_ENDPOINT,
  GET_ALL_PROPOSALS_ENDPOINT,
  GET_ALL_PROPOSAL_TOPICS_ENDPOINT,
  GET_PROPOSAL_COMMENTS_ENDPOINT,
  GET_PROPOSAL_COMMENTS_RESPONSES_ENDPOINT,
  GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT,
  GET_PROPOSAL_INFO_ENDPOINT,
  GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT,
  GET_PROPOSAL_TOPIC_INFO_ENDPOINT,
  PUBLISH_PROPOSALS_ENDPOINT,
  PUBLISH_PROPOSAL_COMMENT_ENDPOINT,
  PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT,
  PUBLISH_PROPOSAL_TOPIC_ENDPOINT,
  RESOLVE_PROPOSAL_SHARE_ID_ENDPOINT,
  SUPPORT_PROPOSAL_ENDPOINT,
  VOTE_PROPOSAL_COMMENT_ENDPOINT,
  VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT,
} from ".";

// PUBLISH PROPOSAL
export const usePublishProposal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: FormData): Promise<ResponseDataType> => {
      return axios
        .post(PUBLISH_PROPOSALS_ENDPOINT, values, {
          headers: {
            ...configOptions(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        navigate(ROUTES.PROPOSALS_HOME_ROUTE);
      },
    }
  );
};
// PUBLISH PROPOSAL COMMENT
export const usePublishProposalComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof proposalCommentSchema>) => {
      return axios
        .post(
          PUBLISH_PROPOSAL_COMMENT_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
        .then((res) => res.data as ResponseDataType);
    },
    {
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries("proposal-comments");
        queryClient.invalidateQueries({
          queryKey: ["proposal-info", variables.proposal_id],
        });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};
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
export const useGetProposalInfo = (proposalId: string) => {
  return useQuery({
    queryKey: ["proposal-info", proposalId],
    queryFn: (): Promise<ProposalType> => {
      return axios
        .get(GET_PROPOSAL_INFO_ENDPOINT(proposalId))
        .then((res) => res.data.data.proposal);
    },
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

// GET PROPOSAL COMMENTS
export const useGetProposalComments = (
  proposalId: string,
  page: number,
  filter?: string
) => {
  return useQuery({
    queryKey: ["proposal-comments"],
    queryFn: (): Promise<CommentDataType> => {
      return axios
        .get(GET_PROPOSAL_COMMENTS_ENDPOINT(proposalId, page, filter))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

// GET PROPOSAL COMMENT RESPONSES
export const useGetProposalCommentResponses = (commentId: string) => {
  return useInfiniteQuery(
    ["proposal-comments-responses"],
    (
      context: QueryFunctionContext<string[], number>
    ): Promise<CommentDataType> => {
      const { pageParam = 1 } = context;
      return axios
        .get(
          GET_PROPOSAL_COMMENTS_RESPONSES_ENDPOINT(commentId, Number(pageParam))
        )
        .then((res) => res.data.data);
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      enabled: false,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );
};


// VOTE PROPOSAL COMMENT
export const useVoteProposalComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof voteProposalCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(VOTE_PROPOSAL_COMMENT_ENDPOINT(values.type, values.comment_id))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["proposal-comments"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// SUPPORT PROPOSAL
export const useSupportProposal = (proposalId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .patch(SUPPORT_PROPOSAL_ENDPOINT(proposalId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("proposal-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// DELETE PROPOSAL
export const useDeleteProposal = (proposalId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .delete(DELETE_PROPOSAL_ENDPOINT(proposalId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        navigate(ROUTES.PROPOSALS_HOME_ROUTE, { replace: true });
      },
    }
  );
};

// DELETE PROPOSAL DOCUMENT
export const useDeleteProposalDoc = (proposalId: string, docId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .delete(DELETE_PROPOSAL_DOC_ENDPOINT(proposalId, docId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("proposal-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

//SHARE ID
export const useResolveProposalShareID = (shareableId: string) => {
  return useQuery(
    ["proposal-shareID"],
    (): Promise<string> => {
      return axios
        .get(RESOLVE_PROPOSAL_SHARE_ID_ENDPOINT(shareableId))
        .then((res) => res.data.data.id);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

//PROPOSAL COMMUNITY

//publish proposal topic
export const usePublishProposalTopic = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (
      values: z.infer<typeof proposalTopicSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(PUBLISH_PROPOSAL_TOPIC_ENDPOINT, values, {
          headers: configOptions(),
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res, variables) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        if (variables.id) {
          queryClient.invalidateQueries("get-proposal-topic-info");
        } else {
          queryClient.invalidateQueries("get-proposal-topics");
        }
      },
    }
  );
};

// get all proposal topics
export const useGetAllProposalTopics = (
  page: number,
  proposalId: string,
  filter: string
) => {
  return useQuery(
    ["get-proposal-topics"],
    (): Promise<ProposalTopicDataType> => {
      return axios
        .get(GET_ALL_PROPOSAL_TOPICS_ENDPOINT(page, proposalId, filter), {
          headers: configOptions(),
        })
        .then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
// get proposal topic info
export const useGetProposalTopicInfo = (topicId: string) => {
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
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof proposalTopicCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(
          PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("proposal-topic-comments");
        queryClient.invalidateQueries("get-proposal-topic-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};
// get proposal topic comments
export const useGetProposalTopicComments = (
  topicId: string,
  page: number,
  filter?: string
) => {
  return useQuery({
    queryKey: ["proposal-topic-comments"],
    queryFn: (): Promise<CommentDataType> => {
      return axios
        .get(GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT(topicId, page, filter))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

// vote proposal topic comment
export const useVoteProposalTopicComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof voteProposalCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(
          VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT(values.type, values.comment_id)
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: ["proposal-topic-comments"],
        });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};
// get all proposal community members
export const useGetProposalCommunityMembers = (proposalId: string) => {
  return useQuery(
    ["get-proposal-community-member"],
    (): Promise<ProposalCommunityMemberType[]> => {
      return axios
        .get(GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT(proposalId), {
          headers: configOptions(),
        })
        .then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
