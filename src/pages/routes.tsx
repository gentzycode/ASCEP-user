import { Navigate } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, OTPPage, SignupPage } from "./Auth";
import Debates from "./Democracy/Debates";
import Proposals from "./Democracy/Proposals";
import Home from "./Home";
import { MainPage } from "./Main";
import Response from "./Response";
import Initiatives from "./Democracy/Initiatives";

const routes: RouterType[] = [
  {
    path: "/",
    element: <Home />,
    title: "home",
  },
  {
    path: "/main",
    element: <MainPage />,
    title: "main",
  },
  {
    path: "/democracy",
    element: <Navigate to="/democracy/debates" />,
    title: "democracy",
  },
  {
    path: "/democracy/debates",
    element: <Debates />,
    title: "democracy-debates",
  },
  {
    path: "/democracy/proposals",
    element: <Proposals />,
    title: "democracy-proposals",
  },
  {
    path: "/democracy/initiatives",
    element: <Initiatives />,
    title: "democracy-initiatives",
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
