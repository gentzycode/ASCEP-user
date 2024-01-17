import baseUrl from "../baseUrl";

export const GET_ALL_AUTHORITIES_ENDPOINT = baseUrl + "/authority/all";
export const SEARCH_AUTHORITIES_ENDPOINT = (searchTerm: string) =>
  baseUrl + `/authority/search?query=${searchTerm}`;
export const GET_AUTHORITY_INFO_ENDPOINT = (authorityId: string) =>
  baseUrl + `/authority/info/${authorityId}`;

// REQUESTS
export const GET_ALL_AUTHORITIES_REQUESTS_COUNT_ENDPOINT =
  baseUrl + "/dialogue/authority-request-count";
export const CREATE_REQUEST_ENDPOINT = baseUrl + "/dialogue/compose";
export const GET_ALL_REQUESTS_ENDPOINT = baseUrl + "/dialogue/all";
export const GET_REQUEST_INFO_ENDPOINT = (requestId: string) =>
  baseUrl + `/dialogue/info/${requestId}`;
export const RESOLVE_REQUEST_SHARE_ID_ENDPOINT = (requestId: string) =>
  baseUrl + `/dialogue/resolve-link/${requestId}`;
