interface SurveyListItemType {
  id: number;
  title: string;
  description: string;
  category_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  updatedAt: string;
  createdAt: string;
  longitude: string;
  latitude: string;
  location_meta: string;
  surveySDGs: ReportSdg[];
}

interface SurveyInfoType {
  id: number;
  title: string;
  description: string;
  category_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  updatedAt: string;
  createdAt: string;
  longitude: string;
  latitude: string;
  location_meta: string;
  surveySDGs: ReportSdg[];
  questions: SurveyQuestion[];
}

interface SurveyQuestion {
  id: number;
  survey_id: number;
  question_text: string;
  response_type: SurveyOptionType;
  updatedAt: string;
  createdAt: string;
  question_options?: string[];
  userAnswered: boolean;
  userResponse: string | string[];
}

interface SuveryQuestionsResponse {
  responses: QuestionResponse[];
  meta: MetaDataType;
}

interface QuestionResponse {
  id: number;
  question_id: number;
  user_id: number;
  response_text: string;
  updatedAt: string;
  createdAt: string;
  user: SurveyUser;
}

interface SurveyUser {
  firstname: string | null;
  lastname: string | null;
  username: string;
  profile_picture: string | null;
  id: number;
}

type SurveyOptionType = "text" | "single_choice" | "multiple_choice";

interface SurveyAnswer {
  question_id: number;
  response_text: string | string[] | null;
}
