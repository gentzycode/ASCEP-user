const ROUTES = {
    SIGNIN_ROUTE: "/auth/login",
    SIGNUP_ROUTE: "/auth/signup",
    MAIN_ROUTE: "/main",
    // DEBATE
    DEBATES_HOME_ROUTE: "/democracy/debates",
    DEBATE_INFO_ROUTE: (id: number) => `/democracy/debates/${id}`,
    PUBLISH_DEBATE_ROUTE: "/democracy/debates/publish-debate",
    EDIT_DEBATE_ROUTE: (debateId: number) => `/democracy/debates/edit-debate/${debateId}`,
    //PROPOSAL
    PROPOSALS_HOME_ROUTE: "/democracy/proposals",
    START_PROPOSAL_ROUTE: "/democracy/proposals/start-proposal",
    PROPOSAL_INFO_ROUTE: (id: number) => `/democracy/proposals/${id}`,
    PROPOSAL_COMMUNITY_ROUTE: (id: number) => `/democracy/proposals/community/${id}`,
    PROPOSAL_TOPIC_INFO_ROUTE: (id: number) => `/democracy/proposals/community/topic/${id}`,
    //INITIATIVES
    INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
    START_INITIATIVE_ROUTE: "/democracy/initiatives/start-initiative",
    // SDG
    SDGs_HOME_ROUTE: "/democracy/sdg",
    SDGs_DETAILS_ROUTE: "/democracy/sdg/details",
}

export default ROUTES

