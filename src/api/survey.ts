import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useGetAllSurveys = ({ filtersString }: GetAllReportsQueryArgs) => {
  return useQuery(
    ["all-surveys", filtersString],
    (): Promise<SurveyListItemType[]> => {
      return axios
        .get(`${baseUrl}/survey/all${filtersString}`)
        .then((res) => res.data.data.surveys);
    },
    {
      retry: false,
    }
  );
};

export const useGetSurveyInfo = (id: string) => {
  return useQuery(
    ["survey-info", id],
    (): Promise<SurveyInfoType> => {
      return axios
        .get(`${baseUrl}/survey/info/${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetSurveyResponses = ({
  id,
  page,
}: GetReportCommentsQueryArgs) => {
  return useQuery(
    ["survey-responses", id, page],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(
          `${baseUrl}/survey/question-responses?question_id=${id}&page=${page}&perPage=2`
        )
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useSubmitSurvey = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (values: { answer: SurveyAnswer[] }) => {
      return axios
        .post(`${baseUrl}/survey/answer`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-surveys");
        toast({
          title: "Success!",
          variant: "success",
          description: `Survey submitted`,
        });
        navigate("/response/data-view", { state: { tab: "surveys" } });
      },
    }
  );
};
