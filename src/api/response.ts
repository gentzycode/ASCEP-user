/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "./baseUrl";

export const useCreateReport = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: FormData) => {
      return axios
        .post(`${baseUrl}/report/create`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-reports");
        toast({
          title: "Success!",
          variant: "success",
          description: `Report created`,
        });
      },
    }
  );
};

export const useGetAllReports = ({ filtersString }: GetAllReportsQueryArgs) => {
  return useQuery(
    ["all-reports", filtersString],
    (): Promise<ReportData[]> => {
      return axios
        .get(`${baseUrl}/report/all${filtersString}`)
        .then((res) => res.data.data.reports);
    },
    {
      retry: false,
    }
  );
};

export const useGetAllActivities = ({
  filtersString,
}: GetAllReportsQueryArgs) => {
  return useQuery(
    ["all-activities", filtersString],
    (): Promise<ActivityResponse> => {
      return axios
        .get(`${baseUrl}/report/activities${filtersString}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useGetReportInfo = (id: string) => {
  return useQuery(
    ["report-info", id],
    (): Promise<ReportData> => {
      return axios
        .get(`${baseUrl}/report/info/${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const usePostComment = () => {
  const { toast } = useToast();
  // const [commentResponseId, setCommentResponseId] = useState<
  //   string | undefined
  // >();
  const queryClient = useQueryClient();
  let commentResponseId: undefined | number;
  return useMutation(
    (values: PostCommentPayload) => {
      commentResponseId = values.comment_reference;
      return axios
        .post(`${baseUrl}/report/comment`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("report-comments");
        if (commentResponseId) {
          //@ts-ignore
          queryClient.invalidateQueries(commentResponseId);
        }
        toast({
          title: "Success!",
          variant: "success",
          description: `Comment sent`,
        });
      },
    }
  );
};

export const useGetReportComments = ({
  id,
  page,
}: GetReportCommentsQueryArgs) => {
  return useQuery(
    ["report-comments", id, page],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(`${baseUrl}/report/comments?report=${id}&page=${page}&perPage=2`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useGetReportCommentsResonponses = ({
  id,
  perPage,
}: GetReportCommentsResonponsesQueryArgs) => {
  return useQuery(
    [id, perPage],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(
          `${baseUrl}/report/comment-responses?comment=${id}&perPage=${perPage}`
        )
        .then((res) => res.data.data);
    },
    {
      retry: false,
      enabled: !!id,
    }
  );
};

export const useDeleteComment = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  let commentResponseId: undefined | number;
  return useMutation(
    (id: number) => {
      commentResponseId = id;
      return axios
        .delete(`${baseUrl}/report/comment/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("report-comments");
        if (commentResponseId) {
          //@ts-ignore
          queryClient.invalidateQueries(commentResponseId);
        }
        toast({
          title: "Success!",
          variant: "success",
          description: `Comment deleted`,
        });
      },
    }
  );
};
