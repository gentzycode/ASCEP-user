import baseUrl from "../baseUrl";

//DEBATES ENDPOINTS
const perPage = 10
export const PUBLISH_DEBATES_ENDPOINT = baseUrl + "/debate/publish"
export const PUBLISH_COMMENT_ENDPOINT = baseUrl + "/debate/comment"
export const GET_ALL_DEBATES_ENDPOINT = baseUrl + "/debate/all"
export const GET_DEBATE_INFO_ENDPOINT = (debateId: number) => baseUrl + `/debate/info/${debateId}`
export const GET_ALL_SDGs_ENDPOINT = baseUrl + "/sdg/all"

export const GET_DEBATE_COMMENTS_ENDPOINT = (debateId: number, page: number) => baseUrl + `/debate/comments?page=${page}&perPage=${perPage}&filter=newest&debate=${debateId}`