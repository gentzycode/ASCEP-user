import { Navigate } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, OTPPage, SignupPage } from "./Auth";
import Home from "./Home";
import { MainPage } from "./Main";
import Response from "./Response";
import { SettingsPage } from "./Settings";
import {
  DebatesHomePage,
  DebatesInfoPage,
  InitiativesHomePage,
  ProposalsHomePage,
  SDGsHomePage,
  StartDebatePage,
} from "./Democracy";

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
    element: <DebatesHomePage />,
    title: "democracy-debates",
  },
  {
    path: "/democracy/debates/:id",
    element: <DebatesInfoPage />,
    title: "democracy-debate-info",
  },
  {
    path: "/democracy/debates/start-debate",
    element: <StartDebatePage />,
    title: "democracy-debate-start",
  },
  {
    path: "/democracy/proposals",
    element: <ProposalsHomePage />,
    title: "democracy-proposals",
  },
  {
    path: "/democracy/initiatives",
    element: <InitiativesHomePage />,
    title: "democracy-initiatives",
  },
  {
    path: "/democracy/sdg",
    element: <SDGsHomePage />,
    title: "democracy-SDGs",
  },
  {
    path: "/response",
    element: <Response />,
    title: "response",
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    title: "ssettings",
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
