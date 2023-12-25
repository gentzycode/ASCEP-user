import baseUrl from "../baseUrl";

//DEBATES ENDPOINTS
const perPage = 10
export const PUBLISH_DEBATES_ENDPOINT = baseUrl + "/debate/publish"
export const PUBLISH_COMMENT_ENDPOINT = baseUrl + "/debate/comment"
export const GET_ALL_DEBATES_ENDPOINT = baseUrl + "/debate/all"
export const GET_DEBATE_INFO_ENDPOINT = (debateId: string) => baseUrl + `/debate/info/${debateId}`
export const VOTE_DEBATE_ENDPOINT = (type: string, debate_id: string) => baseUrl + `/debate/vote/${type}/${debate_id}`
export const VOTE_DEBATE_COMMENT_ENDPOINT = (type: string, comment_id: string) => baseUrl + `/debate/vote-comment/${type}/${comment_id}`
export const GET_DEBATE_COMMENTS_ENDPOINT = (debateId: string, page: number, filter?: string) => baseUrl + `/debate/comments?page=${page}&perPage=${perPage}&filter=${filter}&debate=${debateId}`
export const RESOLVE_SHARE_ID_ENDPOINT = (shareableId: string) => baseUrl + `/debate/resolve-link/${shareableId}`

//PROPOSALS ENDPOINTS
export const PUBLISH_PROPOSALS_ENDPOINT = baseUrl + "/proposal/compose"
export const GET_ALL_PROPOSALS_ENDPOINT = baseUrl + "/proposal/all"
export const PUBLISH_PROPOSAL_COMMENT_ENDPOINT = baseUrl + "/proposal/comment"
export const GET_PROPOSAL_INFO_ENDPOINT = (proposalId: string) => baseUrl + `/proposal/info/${proposalId}`
export const GET_PROPOSAL_COMMENTS_ENDPOINT = (proposalId: string, page: number, filter?: string) => baseUrl + `/proposal/comments?page=${page}&perPage=${perPage}&filter=${filter}&proposal=${proposalId}`
export const VOTE_PROPOSAL_COMMENT_ENDPOINT = (type: string, comment_id: string) => baseUrl + `/proposal/vote-comment/${type}/${comment_id}`
export const SUPPORT_PROPOSAL_ENDPOINT = (proposalId: string) => baseUrl + `/proposal/support/${proposalId}`

// PROPOSAL COMMUNITY
export const PUBLISH_PROPOSAL_TOPIC_ENDPOINT = baseUrl + "/proposal/topic/compose"
export const GET_ALL_PROPOSAL_TOPICS_ENDPOINT = (page: number, proposalId: string, filter: string) => baseUrl + `/proposal/topic/all?page=${page}&perPage=${perPage}&proposal=${proposalId}&filter=${filter}`
export const GET_PROPOSAL_COMMUNITY_MEMBERS_ENDPOINT = (proposalId: string) => baseUrl + `/proposal/community/${proposalId}`
export const GET_PROPOSAL_TOPIC_INFO_ENDPOINT = (topicId: string) => baseUrl + `/proposal/topic/info/${topicId}`
export const GET_PROPOSAL_TOPIC_COMMENTS_ENDPOINT = (topicId: string, page: number, filter?: string) => baseUrl + `/proposal/topic/comments?page=${page}&perPage=${perPage}&filter=${filter}&proposalTopic=${topicId}`
export const PUBLISH_PROPOSAL_TOPIC_COMMENT_ENDPOINT = baseUrl + "/proposal/topic/comment"
export const VOTE_PROPOSAL_TOPIC_COMMENT_ENDPOINT = (type: string, comment_id: string) => baseUrl + `/proposal/topic/vote-comment/${type}/${comment_id}`

//SDG
export const GET_ALL_SDGs_ENDPOINT = baseUrl + "/sdg/all"

//WARDS
export const GET_ALL_WARDS_ENDPOINT = baseUrl + "/local/wards"