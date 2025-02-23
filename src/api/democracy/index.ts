import baseUrl from "../baseUrl";

//DEBATES ENDPOINTS
const perPage = 10;
export const PUBLISH_DEBATES_ENDPOINT = baseUrl + "/debate/publish";

export const PUBLISH_COMMENT_ENDPOINT = baseUrl + "/debate/comment";

export const GET_ALL_DEBATES_ENDPOINT = baseUrl + "/debate/all";

export const GET_DEBATE_INFO_ENDPOINT = (debateId: string) =>
  baseUrl + `/debate/info/${debateId}`;

export const VOTE_DEBATE_ENDPOINT = (type: string, debate_id: string) =>
  baseUrl + `/debate/vote/${type}/${debate_id}`;

export const VOTE_DEBATE_COMMENT_ENDPOINT = (
  type: string,
  comment_id: string
) => baseUrl + `/debate/vote-comment/${type}/${comment_id}`;

export const GET_DEBATE_COMMENTS_ENDPOINT = (
  debateId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/debate/comments?page=${page}&perPage=${perPage}&filter=${filter}&debate=${debateId}`;

export const GET_DEBATE_COMMENTS_RESPONSES_ENDPOINT = (
  commentId: string,
  page: number
) =>
  baseUrl +
  `/debate/comment-responses?page=${page}&perPage=${perPage}&comment=${commentId}`;

export const DELETE_DEBATE_ENDPOINT = (debateId: string) =>
  baseUrl + `/debate/delete/${debateId}`;
export const RESOLVE_DEBTATE_SHARE_ID_ENDPOINT = (shareableId: string) =>
  baseUrl + `/debate/resolve-link/${shareableId}`;

//PROPOSALS ENDPOINTS
export const PUBLISH_PROPOSALS_ENDPOINT = baseUrl + "/proposal/compose";
export const GET_ALL_PROPOSALS_ENDPOINT = baseUrl + "/proposal/all";
export const PUBLISH_PROPOSAL_COMMENT_ENDPOINT = baseUrl + "/proposal/comment";
export const GET_PROPOSAL_INFO_ENDPOINT = (proposalId: string) =>
  baseUrl + `/proposal/info/${proposalId}`;
export const GET_PROPOSAL_COMMENTS_ENDPOINT = (
  proposalId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/proposal/comments?page=${page}&perPage=${perPage}&filter=${filter}&proposal=${proposalId}`;
export const GET_PROPOSAL_COMMENTS_RESPONSES_ENDPOINT = (
  commentId: string,
  page: number
) =>
  baseUrl +
  `/proposal/comment-responses?page=${page}&perPage=${perPage}&comment=${commentId}`;

export const VOTE_PROPOSAL_COMMENT_ENDPOINT = (
  type: string,
  comment_id: string
) => baseUrl + `/proposal/vote-comment/${type}/${comment_id}`;
export const SUPPORT_PROPOSAL_ENDPOINT = (proposalId: string) =>
  baseUrl + `/proposal/support/${proposalId}`;

export const DELETE_PROPOSAL_ENDPOINT = (proposalId: string) =>
  baseUrl + `/proposal/delete/${proposalId}`;

export const DELETE_PROPOSAL_DOC_ENDPOINT = (
  proposalId: string,
  docId: string
) => baseUrl + `/proposal/document/${docId}/${proposalId}`;
export const RESOLVE_PROPOSAL_SHARE_ID_ENDPOINT = (shareableId: string) =>
  baseUrl + `/proposal/resolve-link/${shareableId}`;

// PROPOSAL COMMUNITY
export const PUBLISH_PROPOSAL_TOPIC_ENDPOINT =
  baseUrl + "/proposal/topic/compose";
export const GET_ALL_PROPOSAL_TOPICS_ENDPOINT = (
  page: number,
  proposalId: string,
  filter: string
) =>
  baseUrl +
  `/proposal/topic/all?page=${page}&perPage=${perPage}&proposal=${proposalId}&filter=${filter}`;
export const GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT = (proposalId: string) =>
  baseUrl + `/proposal/community/${proposalId}`;
export const GET_PROPOSAL_TOPIC_INFO_ENDPOINT = (topicId: string) =>
  baseUrl + `/proposal/topic/info/${topicId}`;
export const GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT = (
  topicId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/proposal/topic/comments?page=${page}&perPage=${perPage}&filter=${filter}&proposalTopic=${topicId}`;

export const GET_PROPOSAL_TOPIC_COMMENTS_RESPONSES_ENDPOINT = (
  commentId: string,
  page: number
) =>
  baseUrl +
  `/proposal/topic/comment-responses?page=${page}&perPage=${perPage}&comment=${commentId}`;

export const PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT =
  baseUrl + "/proposal/topic/comment";
export const VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT = (
  type: string,
  comment_id: string
) => baseUrl + `/proposal/topic/vote-comment/${type}/${comment_id}`;

//INITIATIVES ENDPOINTS
export const PUBLISH_INITIATIVES_ENDPOINT = baseUrl + "/initiative/compose";
export const GET_ALL_INITIATIVES_ENDPOINT = baseUrl + "/initiative/all";
export const GET_INITIATIVE_INFO_ENDPOINT = (initiativeId: string) =>
  baseUrl + `/initiative/info/${initiativeId}`;
export const PUBLISH_INITIATIVE_COMMENT_ENDPOINT =
  baseUrl + "/initiative/comment";
export const GET_INITIATIVE_COMMENTS_ENDPOINT = (
  initiativeId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/initiative/comments?page=${page}&perPage=${perPage}&filter=${filter}&initiative=${initiativeId}`;

export const GET_INITIATIVE_COMMENTS_RESPONSES_ENDPOINT = (
  commentId: string,
  page: number
) =>
  baseUrl +
  `/initiative/comment-responses?page=${page}&perPage=${perPage}&comment=${commentId}`;

export const VOTE_INITIATIVE_COMMENT_ENDPOINT = (
  type: string,
  comment_id: string
) => baseUrl + `/initiative/vote-comment/${type}/${comment_id}`;

export const SUPPORT_INITIATIVE_ENDPOINT = (initiativeId: string) =>
  baseUrl + `/initiative/support/${initiativeId}`;

export const FOLLOW_INITIATIVE_ENDPOINT = baseUrl + `/initiative/follow`;

export const DELETE_INITIATIVE_ENDPOINT = (initiativeId: string) =>
  baseUrl + `/initiative/delete/${initiativeId}`;
export const RESOLVE_INITIATIVE_SHARE_ID_ENDPOINT = (shareableId: string) =>
  baseUrl + `/initiative/resolve-link/${shareableId}`;

//VOTING/POLLING
export const PUBLISH_POLL_ENDPOINT = baseUrl + "/voting/compose-poll";
export const GET_ALL_POLLS_ENDPOINT = baseUrl + "/voting/all";
export const PUBLISH_POLL_COMMENT_ENDPOINT = baseUrl + "/voting/comment";
export const GET_POLL_INFO_ENDPOINT = (pollId: string) =>
  baseUrl + `/voting/poll-information/${pollId}`;
export const GET_POLL_COMMENTS_ENDPOINT = (
  pollId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/voting/comments?page=${page}&perPage=${perPage}&filter=${filter}&poll=${pollId}`;

export const GET_POLL_COMMENTS_RESPONSES_ENDPOINT = (
  pollId: string,
  page: number
) =>
  baseUrl +
  `/voting/comment-responses?page=${page}&perPage=${perPage}&comment=${pollId}`;

export const VOTE_POLL_COMMENT_ENDPOINT = (type: string, comment_id: string) =>
  baseUrl + `/voting/vote-comment/${type}/${comment_id}`;
export const PUBLISH_POLL_QUESTION_ENDPOINT = baseUrl + "/voting/poll-question";

export const GET_POLL_QUESTIONS_ENDPOINT = (pollId: string) =>
  baseUrl + `/voting/questions/${pollId}`;

export const PUBLISH_QUESTION_ANSWERS_ENDPOINT =
  baseUrl + "/voting/answer-question";

export const LINK_PROPOSAL_ENDPOINT = baseUrl + "/voting/link-proposals";

export const DELETE_POLL_ENDPOINT = (pollId: string) =>
  baseUrl + `/voting/delete/${pollId}`;

export const RESOLVE_POLL_SHARE_ID_ENDPOINT = (shareableId: string) =>
  baseUrl + `/voting/resolve-link/${shareableId}`;

//BUDGETING
export const GET_ALL_BUDGET_ENDPOINT = (page: string) =>
  baseUrl + `/budget/all/${page}/${perPage}`;
export const GET_CURRENT_BUDGET_ENDPOINT = baseUrl + "/budget/current";
export const GET_BUDGET_PHASES_ENDPOINT = baseUrl + "/budget/phase-modules";

//SDG
export const GET_ALL_SDGs_ENDPOINT = baseUrl + "/sdg/all";

//WARDS
export const GET_ALL_WARDS_ENDPOINT = baseUrl + "/local/wards";
