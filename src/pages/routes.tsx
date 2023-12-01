import { SignupPage } from "./Auth";
import ForgotPasswordPage from "./Auth/forgot-password";
import LoginPage from "./Auth/login";
import OTPPage from "./Auth/otp";
import Debates from "./Democracy/Debates";
import Proposals from "./Democracy/Proposals";
import Home from "./Home";
import Response from "./Response";

const routes: RouterType[] = [
  {
    path: "/",
    element: <Home />,
    title: "home",
  },
  {
    path: "/debates",
    element: <Debates />,
    title: "democracy-debates",
  },
  {
    path: "/proposals",
    element: <Proposals />,
    title: "democracy-proposals",
  },
  {
    path: "/response",
    element: <Response />,
    title: "response",
  },
];

export const unauthenticatedRoutes: RouterType[] = [
  {
    path: "signup",
    element: <SignupPage />,
    title: "signup",
  },
  {
    path: "login",
    element: <LoginPage />,
    title: "login",
  },
  {
    path: "otp",
    element: <OTPPage />,
    title: "otp",
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
    title: "forgot-password",
  },
];

export default routes;
