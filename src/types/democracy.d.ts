interface SdgOptionsType {
  image: string;
  id: number;
  value: number;
}

interface FilterButtonOptionsType {
  label: string;
  value: string;
}

// DEBATES
interface DebateAuthorType {
  id: string;
  username: string;
  profile_picture: string | null;
  firstname?: string;
  lastname?: string;
}
interface DebateTagType {
  id: number;
  tag_name: string;
  debate_id: number;
}
interface TargetType {
  target_id: number;
  debate_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}

interface DebateSDGsType {
  sdgs_id: number;
  debate_id: number;
  sdgs: {
    banner: string;
    id: number;
    title: string;
  };
}

interface MetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  previous_page_url: string | null;
}

interface DebateDataType {
  meta: MetaDataType;
  debates: DebateType[];
}
interface DebateType {
  id: string;
  title: string;
  description: string;
  shareable_id: string;
  user_id: string;
  total_comments_cache: number;
  total_votes_cache: number;
  inapproriate_flag: boolean;
  createdAt: string;
  debateTag: DebateTagType[];
  author: DebateAuthorType;
  debateTarget: TargetType[];
  debateSDGs: DebateSDGsType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: {
    reaction: boolean;
    reactionType: string;
  };
}

interface CommentResponseType {
  response_id: string;
  comment_id: string;
  commentDetail: {
    content;
    id: string;
    user_id: string;
    user: DebateAuthorType;
    responses: DebateCommentResponseType[];
  };
}

//vote debate
interface DebateVoteDataType {
  status: string;
  message: string;
  data: {
    total: number;
    type: string;
  };
}

//SDGs
interface SDGTarget {
  id: number;
  code: string;
  description: string;
  sdgs_id: number;
}
interface SDGType {
  status: string;
  message: string;
  data: SDGsType[];
}
interface SDGsType {
  id: number;
  title: string;
  description: string;
  official_link: string;
  banner: string;
  sdgTarget: SDGTarget[];
}

type RequestStatustType = "error" | "idle" | "loading" | "success";

interface ResponseDataType {
  status: string;
  message: string;
  data?: any;
}

// PROPOSALS
interface ProposalDataType {
  meta: MetaDataType;
  proposals: ProposalType[];
}
interface ProposalType {
  id: string;
  user_id: string;
  title: string;
  content: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  summary: string;
  descriptive_image: string;
  support_needed: number;
  ward_id: number;
  external_video_url: string;
  total_support_cache: number;
  total_comments_cache: number;
  proposalTag: ProposalTagType[];
  proposalCategory: ProposalCategoryType[];
  proposalTarget: TargetType[];
  proposalSDGs: ProposalSDGType[];
  author: ProposalAuthorType;
  supportGotten: number;
  supportNeeded: number;
  supportPercentage: number;
  userSupported: boolean;
  proposal_code: string;
  proposalDocuments: {
    document_url: string;
    proposal_id: string;
    id: string;
  }[];
}

interface ProposalAuthorType {
  id: string;
  username: string;
  profile_picture: string;
}
interface ProposalSDGType {
  sdgs_id: number;
  proposal_id: number;
  sdgs: {
    title: string;
    banner: string;
    id: number;
  };
}
interface ProposalCategoryType {
  category_id: number;
  proposal_id: string;
  categoryDetail: {
    name: string;
    id: number;
  };
}
interface ProposalTagType {
  id: number;
  tag_name: string;
  proposal_id: number;
}

// PROPOSAL TOPICS
interface ProposalTopicDataType {
  meta: MetaDataType;
  data: ProposalTopicType[];
}

interface ProposalTopicType {
  id: string;
  proposal_id: string;
  user_id: string;
  title: string;
  content: string;
  total_vote_cache: number;
  total_comment_cache: number;
  updated_at: string;
  created_at: string;
  creator: {
    firstname: string;
    lastname: string;
    username: string;
    profile_picture: string;
    id: string;
  };
  proposal: {
    title: string;
    user_id: string;
    id: string;
  };
}
interface ProposalCommunityMemberType {
  user_id: string;
  creator: {
    profile_picture: string;
    firstname: string;
    lastname: string;
    id: string;
  };
}

//COMMENT
interface CommentDataType {
  meta: CommentMetaDataType;
  comments: CommentType[];
}

interface CommentMetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  previous_page_url: string | null;
}
interface CommentType {
  content: string;
  id: string;
  user_id: string;
  author: DebateAuthorType;
  responses: DebateCommentResponseType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: {
    reaction: boolean;
    reactionType: "like" | "dislike";
  };
  createdAt: string;
}

interface CommentResponseDataType {
  meta: CommentMetaDataType;
  comments: CommentType[];
}
interface CommentResponseType {
  content: string;
  id: string;
  user_id: string;
  author: DebateAuthorType;
  responses: DebateCommentResponseType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: {
    reaction: boolean;
    reactionType: string;
  };
  createdAt: string;
}

// INITIATIVE
interface InitiativeDataType {
  meta: MetaDataType;
  initiatives: InitiativeType[];
}

interface InitiativeType {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  created_by: string;
  updatedAt: string;
  createdAt: string;
  ward_id: number;
  latitude: number;
  longitude: number;
  location_meta: number;
  support_needed: number;
  meeting_link: string;
  total_followers_cache: number;
  total_support_cache: number;
  total_comments_cache: number;
  initiative_code: string;
  initiativeTag: InitiativeTag[];
  initiativeTarget: InitiativeTarget[];
  initiativeSDGs: InitiativeSDGs[];
  initiativeCategory: InitiativeCategoryType[];
  author: {
    id: string;
    username: string;
    profile_picture: string;
  };
  supportGotten: number;
  supportNeeded: number;
  supportPercentage: number;
  userFollowing: {
    following: boolean;
  };
  userSupported: {
    reaction: boolean;
  };
  meta: MetaDataType;
}

interface InitiativeCategoryType {
  category_id: number;
  initiative_id: string;
  categoryDetail: {
    name: string;
    id: number;
  };
}

interface InitiativeSDGs {
  sdg_id: number;
  initiative_id: string;
  sdg: {
    title: string;
    banner: string;
    id: number;
  };
}

interface InitiativeTarget {
  target_id: number;
  initiative_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}

interface InitiativeTag {
  id: string;
  tag_name: string;
  initiative_id: string;
}

//VOTING
interface VotingDataType {
  meta: MetaDataType;
  polls: VotingType[];
}

interface VotingType {
  id: string;
  title;
  start_date: string;
  end_date: string;
  summary: string;
  description: string;
  descriptive_image: string;
  show_result: boolean;
  show_statistics: boolean;
  shareable_id: string;
  total_comments_cache: number;
  created_by: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  votingTarget: VotingTarget[];
  votingSDGs: VotingSDGs[];
  author: {
    id: string;
    username: string;
    profile_picture: string;
  };
  userParticipated: boolean;
  questions: VotingQuestionsType[];
  proposals: VotingProposalType[];
}
interface VotingTarget {
  target_id: number;
  voting_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}

interface VotingSDGs {
  sdg_id: number;
  voting_id: string;
  sdg: {
    title: string;
    banner: string;
    id: number;
  };
}

interface VotingQuestionsType {
  id: string;
  response_type: "single" | "multi_choice";
  question: string;
  options: string[];
  userAnswered: {
    user_responded: boolean;
    response: QuestionResponseType;
  };
}

type QuestionResponseType = string | { answer: string[] };

interface VotingProposalType {
  id: string;
  title: string;
  external_video_url: string;
  summary: string;
  descriptive_image: string;
  proposal_code: string;
  proposalDocuments: {
    id: string;
    document_url: string;
    proposal_id: string;
  }[];
}
