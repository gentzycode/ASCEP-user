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
  GET_ALL_POLLS_ENDPOINT,
  GET_POLL_COMMENTS_ENDPOINT,
  GET_POLL_COMMENTS_RESPONSES_ENDPOINT,
  GET_POLL_INFO_ENDPOINT,
  PUBLISH_POLL_COMMENT_ENDPOINT,
  PUBLISH_POLL_ENDPOINT,
  VOTE_POLL_COMMENT_ENDPOINT,
} from ".";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import {
  getPollsSchema,
  pollCommentSchema,
  votePollCommentSchema,
} from "@/schemas/VotingSchema";

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
        console.log(id);
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
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries("poll-comments");
        queryClient.invalidateQueries({
          queryKey: ["proposal-info", variables.voting_id],
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
    ["poll-comments-responses"],
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
      getNextPageParam: (lastPage, pages) => pages.length + 1,
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
