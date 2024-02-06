import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import {
  CREATE_REQUEST_ENDPOINT,
  CREATE_REQUEST_RESPONSE_ENDPOINT,
  GET_ALL_AUTHORITIES_REQUESTS_COUNT_ENDPOINT,
  GET_ALL_REQUESTS_ENDPOINT,
  GET_REQUEST_INFO_ENDPOINT,
  GET_REQUEST_RESPONSE_ENDPOINT,
  RESOLVE_REQUEST_SHARE_ID_ENDPOINT,
} from ".";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { configOptions } from "../config";
import ROUTES from "@/utils/routesNames";
import { getRequestsSchema } from "@/schemas/MakeARequestSchema";
import * as z from "zod";
import { useAppContext } from "@/contexts/AppContext";

// GET AUTHORITY REQUEST COUNT
export const useGetAuthoritiesAndRequestCount = () => {
  return useQuery({
    queryKey: ["request-counts"],
    queryFn: (): Promise<RequestAuthorityCountType> => {
      return axios
        .get(GET_ALL_AUTHORITIES_REQUESTS_COUNT_ENDPOINT)
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// CREATE REQUEST
export const useCreateRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: FormData): Promise<ResponseDataType> => {
      return axios
        .post(CREATE_REQUEST_ENDPOINT, values, {
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
        navigate(ROUTES.BROWSE_REQUEST_HOME_ROUTE, { replace: true });
      },
    }
  );
};
// CREATE REQUEST RESPONSE
export const useCreateRequestResponse = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { handleOpenModal } = useAppContext();
  return useMutation(
    (values: FormData): Promise<ResponseDataType> => {
      return axios
        .post(CREATE_REQUEST_RESPONSE_ENDPOINT, values, {
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
        queryClient.invalidateQueries("get-request-responses");
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

// GET ALL REQUEST RESPONSES
export const useGetRequestResponses = (page: number, request_id: string) => {
  return useQuery(
    ["get-request-responses"],
    async (): Promise<RequestResponseDataType> => {
      return axios
        .get(GET_REQUEST_RESPONSE_ENDPOINT(page, request_id))
        .then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// GET ALL REQUESTS
export const useGetAllRequests = () => {
  return useMutation(
    ["get-requests"],
    (values: z.infer<typeof getRequestsSchema>): Promise<RequestDataType> => {
      return axios
        .post(GET_ALL_REQUESTS_ENDPOINT, { ...values })
        .then((res) => res.data.data);
    }
  );
};

// GET  REQUEST INFo
export const useGetRequestInfo = (requestId: string) => {
  return useQuery(
    ["request-info"],
    (): Promise<RequestType> => {
      return axios
        .get(GET_REQUEST_INFO_ENDPOINT(requestId))
        .then((res) => res.data.data.foirequest);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

//SHARE ID
export const useResolveRequestShareID = (shareableId: string) => {
  return useQuery(
    ["debate-shareID"],
    (): Promise<string> => {
      return axios
        .get(RESOLVE_REQUEST_SHARE_ID_ENDPOINT(shareableId))
        .then((res) => res.data.data.id);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
