/* eslint-disable @typescript-eslint/no-explicit-any */
interface PollType {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  summary: string;
  description: string;
  descriptive_image: any;
  show_result: boolean;
  show_statistics: boolean;
  shareable_id: string;
  total_comments_cache: number;
  created_by: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  votingTarget: VotingTarget[];
  votingSDGs: VotingSdg[];
  author: Author;
  userParticipated: boolean;
  questions: Question[];
}

interface VotingTarget {
  target_id: number;
  voting_id: number;
  targetInfo: TargetInfo;
}

interface TargetInfo {
  code: string;
  id: number;
}

interface VotingSdg {
  sdg_id: number;
  voting_id: number;
  sdg: Sdg;
}

interface Sdg {
  title: string;
  banner: string;
  id: number;
}

interface Author {
  id: number;
  username: string;
  profile_picture: any;
}

interface Question {
  id: number;
  response_type: string;
  question: string;
  options: string[];
  userAnswered: UserAnswered;
}

interface UserAnswered {
  user_responded: boolean;
  response: any;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
  createdBy: RecommendationCreatedBy;
  createdAt: string;
  entity_type:
    | "proposal"
    | "debate"
    | "initiative"
    | "budget"
    | "foirequest"
    | "voting"
    | "report"
    | "survey";
  recommendation_id: number;
}

interface RecommendationCreatedBy {
  firstname: string;
  lastname: string;
  profile_picture: any;
  id: number;
}
