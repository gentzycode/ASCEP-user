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
        queryClient.invalidateQueries("user-profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `Report created`,
        });
      },
    }
  );
};

export const useGetAllReports = () => {
  return useQuery(
    ["all-reports"],
    (): Promise<ReportData[]> => {
      return axios
        .get(`${baseUrl}/report/all?start_date=2023-12-07T23:00:00.000Z`)
        .then((res) => res.data.data.reports);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
