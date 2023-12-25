const ROUTES = {
    SIGNIN_ROUTE: "/auth/login",
    SIGNUP_ROUTE: "/auth/signup",
    MAIN_ROUTE: "/main",
    // DEBATE
    DEBATES_HOME_ROUTE: "/democracy/debates",
    DEBATE_INFO_ROUTE: (debateId: string) => `/democracy/debates/${debateId}`,
    PUBLISH_DEBATE_ROUTE: "/democracy/debates/publish-debate",
    EDIT_DEBATE_ROUTE: (debateId: string) => `/democracy/debates/edit-debate/${debateId}`,
    //PROPOSAL
    PROPOSALS_HOME_ROUTE: "/democracy/proposals",
    START_PROPOSAL_ROUTE: "/democracy/proposals/start-proposal",
    PROPOSAL_INFO_ROUTE: (proposalId: string) => `/democracy/proposals/${proposalId}`,
    PROPOSAL_COMMUNITY_ROUTE: (proposalId: string) => `/democracy/proposals/community/${proposalId}`,
    PROPOSAL_TOPIC_INFO_ROUTE: (topicId: string) => `/democracy/proposals/community/topic/${topicId}`,
    //INITIATIVES
    INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
    START_INITIATIVE_ROUTE: "/democracy/initiatives/start-initiative",
    // SDG
    SDGs_HOME_ROUTE: "/democracy/sdg",
    SDGs_DETAILS_ROUTE: "/democracy/sdg/details",
}

export default ROUTES

