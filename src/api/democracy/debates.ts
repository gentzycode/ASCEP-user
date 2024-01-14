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
  DELETE_DEBATE_ENDPOINT,
  GET_ALL_DEBATES_ENDPOINT,
  GET_ALL_SDGs_ENDPOINT,
  GET_DEBATE_COMMENTS_ENDPOINT,
  GET_DEBATE_COMMENTS_RESPONSES_ENDPOINT,
  GET_DEBATE_INFO_ENDPOINT,
  PUBLISH_COMMENT_ENDPOINT,
  PUBLISH_DEBATES_ENDPOINT,
  RESOLVE_DEBTATE_SHARE_ID_ENDPOINT,
  VOTE_DEBATE_COMMENT_ENDPOINT,
  VOTE_DEBATE_ENDPOINT,
} from ".";
import {
  debateCommentSchema,
  getDebateSchema,
  startDebateSchema,
  voteDebateCommentSchema,
  voteDebateSchema,
} from "@/schemas/DebateSchema";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useAuthContext } from "@/providers/AuthProvider";
import { useAppContext } from "@/contexts/AppContext";

// PUBLISH DEBATE
export const usePublishDebate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: z.infer<typeof startDebateSchema>): Promise<ResponseDataType> => {
      return axios
        .post(
          PUBLISH_DEBATES_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
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
          navigate(ROUTES.DEBATE_INFO_ROUTE(variables.id), { replace: true });
        } else {
          navigate(ROUTES.DEBATES_HOME_ROUTE, { replace: true });
        }
      },
    }
  );
};

// PUBLISH COMMENT
export const usePublishDebateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof debateCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(
          PUBLISH_COMMENT_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("debate-comments");
        queryClient.invalidateQueries("debate-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// GET DEBATES
export const useGetAllDebates = () => {
  return useMutation(
    ["get-debates"],
    (values: z.infer<typeof getDebateSchema>): Promise<DebateDataType> => {
      return axios
        .post(GET_ALL_DEBATES_ENDPOINT, { ...values })
        .then((res) => res.data.data);
    }
  );
};

// GET DEBATE INFO
export const useGetDebateInfo = (debateId: string) => {
  return useQuery({
    queryKey: ["debate-info", debateId],
    queryFn: (): Promise<DebateType> => {
      return axios
        .get(GET_DEBATE_INFO_ENDPOINT(debateId))
        .then((res) => res.data.data.debate);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET DEBATE COMMENTS
export const useGetDebateComments = (
  debateId: string,
  page: number,
  filter?: string
) => {
  return useQuery({
    queryKey: ["debate-comments"],
    queryFn: (): Promise<CommentDataType> => {
      return axios
        .get(GET_DEBATE_COMMENTS_ENDPOINT(debateId, page, filter))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

// GET DEBATE RESPONSES
export const useGetDebateCommentResponses = (commentId: string) => {
  return useInfiniteQuery(
    ["debate-comments-responses", commentId],
    (
      context: QueryFunctionContext<string[], number>
    ): Promise<CommentDataType> => {
      const { pageParam = 1 } = context;
      return axios
        .get(
          GET_DEBATE_COMMENTS_RESPONSES_ENDPOINT(commentId, Number(pageParam))
        )
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

// VOTE DEBATE
export const useVoteDebate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleOpenModal } = useAppContext();
  return useMutation(
    (values: z.infer<typeof voteDebateSchema>) => {
      return axios
        .post(VOTE_DEBATE_ENDPOINT(values.type, values.debate_id))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("debate-info");
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

// VOTE DEBATE COMMENT
export const useVoteDebateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof voteDebateCommentSchema>) => {
      return axios
        .post(VOTE_DEBATE_COMMENT_ENDPOINT(values.type, values.comment_id))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["debate-comments"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

//GET ALL SDGs
export const useGetAllSDGs = () => {
  return useQuery(
    ["sdg"],
    (): Promise<SDGsType[]> => {
      return axios.get(GET_ALL_SDGs_ENDPOINT).then((res) => res.data.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

//SHARE ID
export const useResolveDebateShareID = (shareableId: string) => {
  return useQuery(
    ["debate-shareID"],
    (): Promise<string> => {
      return axios
        .get(RESOLVE_DEBTATE_SHARE_ID_ENDPOINT(shareableId))
        .then((res) => res.data.data.id);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// DELETE DEBATE
export const useDeleteDebate = (debateId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .delete(DELETE_DEBATE_ENDPOINT(debateId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        navigate(ROUTES.DEBATES_HOME_ROUTE, { replace: true });
      },
    }
  );
};
