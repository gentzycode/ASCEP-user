import { useMutation, useQuery } from "react-query";
import axios from "axios";
import {
  CREATE_REQUEST_ENDPOINT,
  GET_ALL_AUTHORITIES_REQUESTS_COUNT_ENDPOINT,
  GET_ALL_REQUESTS_ENDPOINT,
} from ".";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { configOptions } from "../config";
import ROUTES from "@/utils/routesNames";
import { getRequestsSchema } from "@/schemas/MakeARequestSchema";
import * as z from "zod";

// GET AUTHORITY REQUEST COUNT
export const useGetAuthoritiesAndRequestCount = () => {
  return useQuery({
    queryKey: ["all-authorities"],
    queryFn: (): Promise<RequestType> => {
      return axios
        .get(GET_ALL_AUTHORITIES_REQUESTS_COUNT_ENDPOINT)
        .then((res) => res.data.data.debate);
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
      onSuccess: (res, variables) => {
        const id = variables.get("id") as string;
        toast({
          title: "Success!",
          variant: "success",
          description: res.message,
        });
        if (id) {
          navigate(ROUTES.BROWSE_REQUEST_HOME_ROUTE, { replace: true });
        } else {
          navigate(ROUTES.CREATE_REQUEST_ROUTE(id), { replace: true });
        }
      },
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
