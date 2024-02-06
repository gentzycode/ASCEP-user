import axios from "axios";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { configOptions } from "../config";
import { z } from "zod";
import {
  DELETE_POLL_ENDPOINT,
  GET_ALL_POLLS_ENDPOINT,
  GET_POLL_COMMENTS_ENDPOINT,
  GET_POLL_COMMENTS_RESPONSES_ENDPOINT,
  GET_POLL_INFO_ENDPOINT,
  GET_POLL_QUESTIONS_ENDPOINT,
  LINK_PROPOSAL_ENDPOINT,
  PUBLISH_POLL_COMMENT_ENDPOINT,
  PUBLISH_POLL_ENDPOINT,
  PUBLISH_POLL_QUESTION_ENDPOINT,
  PUBLISH_QUESTION_ANSWERS_ENDPOINT,
  RESOLVE_POLL_SHARE_ID_ENDPOINT,
  VOTE_POLL_COMMENT_ENDPOINT,
} from ".";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import {
  getPollsSchema,
  linkProposalSchema,
  pollCommentSchema,
  pollQuestionAnswerSchema,
  votePollCommentSchema,
} from "@/schemas/VotingSchema";
import { useAppContext } from "@/contexts/AppContext";
import baseUrl from "../baseUrl";

// PUBLISH POLL
export const usePublishPoll = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: FormData): Promise<ResponseDataType> => {
      return axios
        .post(PUBLISH_POLL_ENDPOINT, values, {
          headers: {
            ...configOptions(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res, variables) => {
        const id = variables.get("id") as string;
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        if (id) {
          navigate(ROUTES.VOTING_INFO_ROUTE(id), { replace: true });
        } else {
          navigate(ROUTES.VOTING_HOME_ROUTE, { replace: true });
        }
      },
    }
  );
};

// PUBLISH POLL COMMENT
export const usePublishPollComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof pollCommentSchema>) => {
      return axios
        .post(
          PUBLISH_POLL_COMMENT_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
        .then((res) => res.data as ResponseDataType);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("poll-comments");
        queryClient.invalidateQueries("poll-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// GET POLLS
export const useGetAllPolls = () => {
  return useMutation(
    ["get-polls"],
    (values: z.infer<typeof getPollsSchema>): Promise<VotingDataType> => {
      return axios
        .post(GET_ALL_POLLS_ENDPOINT, { ...values })
        .then((res) => res.data.data);
    }
  );
};

// GET POLL INFO
export const useGetPollInfo = (pollId: string) => {
  return useQuery({
    queryKey: ["poll-info", pollId],
    queryFn: (): Promise<VotingType> => {
      return axios
        .get(GET_POLL_INFO_ENDPOINT(pollId))
        .then((res) => res.data.data.voting);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET POLL QUESTIONS
export const useGetPollQuestions = (pollId: string) => {
  return useQuery({
    queryKey: ["poll-questions", pollId],
    queryFn: (): Promise<VotingQuestionsType[]> => {
      return axios
        .get(GET_POLL_QUESTIONS_ENDPOINT(pollId))
        .then((res) => res.data.data.questions);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET POLL COMMENTS
export const useGetPollComments = (
  pollId: string,
  page: number,
  filter?: string
) => {
  return useQuery({
    queryKey: ["poll-comments"],
    queryFn: (): Promise<CommentDataType> => {
      return axios
        .get(GET_POLL_COMMENTS_ENDPOINT(pollId, page, filter))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

// GET POLL COMMENT RESPONSES
export const useGetPollCommentResponses = (commentId: string) => {
  return useInfiniteQuery(
    ["poll-comments-responses", commentId],
    (
      context: QueryFunctionContext<string[], number>
    ): Promise<CommentDataType> => {
      const { pageParam = 1 } = context;
      return axios
        .get(GET_POLL_COMMENTS_RESPONSES_ENDPOINT(commentId, Number(pageParam)))
        .then((res) => res.data.data);
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      enabled: false,
      getNextPageParam: (_, pages) => pages.length + 1,
    }
  );
};

// VOTE POLL COMMENT
export const useVotePollComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof votePollCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(VOTE_POLL_COMMENT_ENDPOINT(values.type, values.comment_id))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["poll-comments"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// PUBLISH POLL QUESTION
export const usePublishPollQuestion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: FormData): Promise<ResponseDataType> => {
      return axios
        .post(PUBLISH_POLL_QUESTION_ENDPOINT, values, {
          headers: {
            ...configOptions(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["poll-questions"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// PUBLISH POLL QUESTION
export const useLinkProposal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof linkProposalSchema>): Promise<ResponseDataType> => {
      return axios
        .put(LINK_PROPOSAL_ENDPOINT, values, { headers: configOptions() })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["poll-questions"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// PUBLISH  QUESTION ANSWER
export const usePublishQuestionAnswers = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleOpenModal } = useAppContext();
  return useMutation(
    (
      values: z.infer<typeof pollQuestionAnswerSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .put(PUBLISH_QUESTION_ANSWERS_ENDPOINT, values, {
          headers: configOptions(),
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["poll-info"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
      onError: (error: any) => {
        const errors = error.response.data.errors;

        errors.map((error: { message: string }) => {
          if (error.message === "E_UNAUTHORIZED_ACCESS: Unauthorized access") {
            handleOpenModal();
            toast({
              title: "Error!",
              variant: "error",
              description: "Please login to perform this action",
            });
          }
        });
      },
    }
  );
};

// DELETE POLL
export const useDeletePoll = (pollId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios.delete(DELETE_POLL_ENDPOINT(pollId)).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        navigate(ROUTES.VOTING_HOME_ROUTE, { replace: true });
      },
    }
  );
};

//SHARE ID
export const useResolvePollShareID = (shareableId: string) => {
  return useQuery(
    ["voting-shareID"],
    (): Promise<string> => {
      return axios
        .get(RESOLVE_POLL_SHARE_ID_ENDPOINT(shareableId))
        .then((res) => res.data.data.id);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

export const useGetPopularPolls = () => {
  return useQuery(
    ["popular-polls"],
    (): Promise<PollType[]> => {
      return axios
        .get(`${baseUrl}/voting/popular`)
        .then((res) => res.data.data.polls);
    },
    {
      retry: false,
    }
  );
};
