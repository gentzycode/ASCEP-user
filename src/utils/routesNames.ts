const ROUTES = {
    SIGNIN_ROUTE: "/auth/login",
    SIGNUP_ROUTE: "/auth/signup",
    MAIN_ROUTE: "/main",
    // DEBATE
    DEBATES_HOME_ROUTE: "/democracy/debates",
    DEBATE_INFO_ROUTE: (id: number) => `/democracy/debates/${id}`,
    PUBLISH_DEBATE_ROUTE: "/democracy/debates/publish-debate",
    //PROPOSAL
    PROPOSALS_HOME_ROUTE: "/democracy/proposals",
    START_PROPOSAL_ROUTE: "/democracy/proposals/start-proposal",
    //INITIATIVES
    INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
    SDGs_HOME_ROUTE: "/democracy/sdg",
}

export default ROUTES

