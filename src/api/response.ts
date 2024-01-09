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

interface GetAllReportsQueryArgs {
  filtersString: string;
}
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
    ["all-activities", id],
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
  const queryClient = useQueryClient();
  return useMutation(
    (values: any) => {
      return axios
        .post(`${baseUrl}/report/comment`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("report-comments");
        toast({
          title: "Success!",
          variant: "success",
          description: `Comment sent`,
        });
      },
    }
  );
};

export const useReportGetComments = (id: string) => {
  return useQuery(
    ["report-comments", id],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(`${baseUrl}/report/comments?report=${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
