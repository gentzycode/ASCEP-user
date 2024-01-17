const ROUTES = {
  SIGNIN_ROUTE: "/auth/login",
  SIGNUP_ROUTE: "/auth/signup",
  MAIN_ROUTE: "/main",

  DEMOCRACY_LANDING_PAGE: "/democracy",
  // DEBATE
  DEBATES_HOME_ROUTE: "/democracy/debates",
  DEBATE_INFO_ROUTE: (debateId: string) => `/democracy/debates/${debateId}`,
  PUBLISH_DEBATE_ROUTE: "/democracy/debates/publish-debate",
  EDIT_DEBATE_ROUTE: (debateId: string) =>
    `/democracy/debates/edit-debate/${debateId}`,

  //PROPOSAL
  PROPOSALS_HOME_ROUTE: "/democracy/proposals",
  START_PROPOSAL_ROUTE: "/democracy/proposals/start-proposal",
  PROPOSAL_INFO_ROUTE: (proposalId: string) =>
    `/democracy/proposals/${proposalId}`,
  PROPOSAL_COMMUNITY_ROUTE: (proposalId: string) =>
    `/democracy/proposals/community/${proposalId}`,
  PROPOSAL_TOPIC_INFO_ROUTE: (topicId: string) =>
    `/democracy/proposals/community/topic/${topicId}`,
  EDIT_PROPOSAL_ROUTE: (proposalId: string) =>
    `/democracy/proposals/edit-proposal/${proposalId}`,

  //INITIATIVES
  INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
  START_INITIATIVE_ROUTE: "/democracy/initiatives/start-initiative",
  INITIATIVE_INFO_ROUTE: (initiativeId: string) =>
    `/democracy/initiatives/${initiativeId}`,
  EDIT_INITIATIVE_ROUTE: (initiativeId: string) =>
    `/democracy/initiatives/edit-initiative/${initiativeId}`,

  // SDG
  SDGs_HOME_ROUTE: "/democracy/sdg",
  SDGs_DETAILS_ROUTE: "/democracy/sdg/details",

  //VOTING
  VOTING_HOME_ROUTE: "/democracy/voting",
  START_POLL_ROUTE: "/democracy/voting/start-poll",
  VOTING_INFO_ROUTE: (pollId: string) => `/democracy/voting/${pollId}`,
  EDIT_VOTE_ROUTE: (pollId: string) => `/democracy/voting/edit-vote/${pollId}`,
  CONFIGURE_VOTE_ROUTE: (pollId: string) =>
    `/democracy/voting/configure/${pollId}`,

  //BUDGETING
  BUDGETING_HOME_ROUTE: "/democracy/budgeting",
  WARD_PROJECTS_HOME_ROUTE: (wardId: string) =>
    `/democracy/budgeting/ward-project/${wardId}`,

  STATE_INVESTMENT_PROJECTS_ROUTE: `/democracy/budgeting/state-investment-projects`,
  INVESTMENT_INFO_ROUTE: (investmentId: string) =>
    `/democracy/budgeting/investment-info/${investmentId}`,

  //MAKE A REQUEST
  MAKE_A_REQUEST_HOME_ROUTE: "/dialogue/make-a-request",
  CREATE_REQUEST_ROUTE: (authorityId: string) =>
    `/dialogue/make-a-request/create-request/${authorityId}`,

  //BROWSE REQUEST
  BROWSE_REQUEST_HOME_ROUTE: "/dialogue/browse-request",
  REQUEST_INFO_ROUTE: (requestId: string) =>
    `/dialogue/browse-request/info/${requestId}`,

  //VIEW AUTHORITIES
  VIEW_AUTHORITIES_HOME_ROUTE: "/dialogue/view-authorities",
  AUTHORITY_INFO_ROUTE: (authorityId: string) =>
    `/dialogue/authority-info/${authorityId}`,

  //DIALOGUE HELP
  DIALOGUE_HELP_HOME_ROUTE: "/dialogue/dialogue-help",
};

export default ROUTES;
