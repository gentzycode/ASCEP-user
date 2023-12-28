import { useMutation, useQuery, useQueryClient } from "react-query";
import { configOptions } from "../config";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import axios from "axios";
import {
  getInitiativeSchema,
  initiativeCommentSchema,
  startInitiativeSchema,
  voteInitiativeCommentSchema,
} from "@/schemas/InitiativesSchema";
import {
  DELETE_INITIATIVE_ENDPOINT,
  GET_ALL_INITIATIVES_ENDPOINT,
  GET_INITIATIVE_COMMENTS_ENDPOINT,
  GET_INITIATIVE_INFO_ENDPOINT,
  PUBLISH_INITIATIVES_ENDPOINT,
  PUBLISH_INITIATIVE_COMMENT_ENDPOINT,
  RESOLVE_INITIATIVE_SHARE_ID_ENDPOINT,
  SUPPORT_INITIATIVE_ENDPOINT,
  VOTE_INITIATIVE_COMMENT_ENDPOINT,
} from ".";

// PUBLISH INITIATIVE
export const usePublishInitiative = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (
      values: z.infer<typeof startInitiativeSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(
          PUBLISH_INITIATIVES_ENDPOINT,
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
          navigate(ROUTES.INITIATIVE_INFO_ROUTE(variables.id), {
            replace: true,
          });
        } else {
          navigate(ROUTES.INITIATIVES_HOME_ROUTE, { replace: true });
        }
      },
    }
  );
};

// PUBLISH PROPOSAL COMMENT
export const usePublishInitiativeComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof initiativeCommentSchema>) => {
      return axios
        .post(
          PUBLISH_INITIATIVE_COMMENT_ENDPOINT,
          { ...values },
          { headers: configOptions() }
        )
        .then((res) => res.data as ResponseDataType);
    },
    {
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries("initiative-comments");
        queryClient.invalidateQueries({
          queryKey: ["initiative-info", variables.initiative_id],
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
// GET INITIATIVES
export const useGetAllInitiatives = () => {
  return useMutation(
    ["get-initiatives"],
    (
      values: z.infer<typeof getInitiativeSchema>
    ): Promise<InitiativeDataType> => {
      return axios
        .post(GET_ALL_INITIATIVES_ENDPOINT, { ...values })
        .then((res) => res.data.data);
    }
  );
};

// GET INITIATIVE INFO
export const useGetInitiativeInfo = (initiativeId: string) => {
  return useQuery({
    queryKey: ["initiative-info", initiativeId],
    queryFn: (): Promise<InitiativeType> => {
      return axios
        .get(GET_INITIATIVE_INFO_ENDPOINT(initiativeId))
        .then((res) => res.data.data.initiative);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET INITIATIVE COMMENTS
export const useGetInitiativeComments = (
  initiativeId: string,
  page: number,
  filter?: string
) => {
  return useQuery({
    queryKey: ["initiative-comments"],
    queryFn: (): Promise<CommentDataType> => {
      return axios
        .get(GET_INITIATIVE_COMMENTS_ENDPOINT(initiativeId, page, filter))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

// VOTE PROPOSAL COMMENT
export const useVoteInitiativeComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (
      values: z.infer<typeof voteInitiativeCommentSchema>
    ): Promise<ResponseDataType> => {
      return axios
        .post(VOTE_INITIATIVE_COMMENT_ENDPOINT(values.type, values.comment_id))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["initiative-comments"] });
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};
// SUPPORT INITIATIVE
export const useSupportInitiative = (initiativeId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .patch(SUPPORT_INITIATIVE_ENDPOINT(initiativeId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("initiative-info");
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
      },
    }
  );
};

// DELETE INITIATIVE
export const useDeleteInitiative = (initiativeId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    (): Promise<ResponseDataType> => {
      return axios
        .delete(DELETE_INITIATIVE_ENDPOINT(initiativeId))
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        navigate(ROUTES.INITIATIVES_HOME_ROUTE, { replace: true });
      },
    }
  );
};

//SHARE ID
export const useResolveInitiativeShareID = (shareableId: string) => {
  return useQuery(
    ["initiative-shareID"],
    (): Promise<string> => {
      return axios
        .get(RESOLVE_INITIATIVE_SHARE_ID_ENDPOINT(shareableId))
        .then((res) => res.data.data.id);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
