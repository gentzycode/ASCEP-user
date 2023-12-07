const ROUTES = {
    SIGNIN_ROUTE: "/auth/login",
    SIGNUP_ROUTE: "/auth/signup",
    MAIN_ROUTE: "/main",
    DEBATES_HOME_ROUTE: "/democracy/debates",
    DEBATE_INFO_ROUTE: (id: number) => `/democracy/debates/${id}`,
    START_DEBATE_ROUTE: "/democracy/debates/start-debate",
    PROPOSALS_HOME_ROUTE: "/democracy/proposals",
    INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
    SDGs_HOME_ROUTE: "/democracy/sdg",
}

export default ROUTES

