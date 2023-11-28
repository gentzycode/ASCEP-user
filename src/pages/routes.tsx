import { SignupPage } from "./Auth";
import Home from "./Home";

const routes: RouterType[] = [
  {
    path: "/",
    element: <Home />,
    title: "home",
  },
];

export const unauthenticatedRoutes: RouterType[] = [
  {
    path: "signup",
    element: <SignupPage />,
    title: "signup",
  },
];

export default routes;
