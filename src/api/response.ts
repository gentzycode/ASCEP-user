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
