const ROUTES = {
    MAIN_ROUTE: "/main",
    DEBATES_HOME_ROUTE: "/democracy/debates",
    DEBATE_INFO_ROUTE: (id: string) => `/democracy/debates/${id}`,
    PROPOSALS_HOME_ROUTE: "/democracy/proposals",
    INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
}

export default ROUTES

