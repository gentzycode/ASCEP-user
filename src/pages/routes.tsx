import { Navigate } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, OTPPage, SignupPage } from "./Auth";
import { MainPage } from "./Main";
import { SettingsPage } from "./Settings";
import {
  DebatesHomePage,
  DebatesInfoPage,
  InitiativesHomePage,
  ProposalsHomePage,
  SDGsHomePage,
  StartDebatePage,
} from "./Democracy";
import { ActivityPage, DataView, MapView } from "./Response";
import DebateProvider from "@/contexts/DebateContext";
import { ContactUs, LandingPage } from "./Landing";

export const landingPages: RouterType[] = [
  {
    path: "",
    element: <LandingPage />,
    title: "home",
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    title: "home",
  },
];

const routes: RouterType[] = [
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
    element: (
      <DebateProvider>
        <DebatesHomePage />
      </DebateProvider>
    ),
    title: "democracy-debates",
  },
  {
    path: "/democracy/debates/:debateId",
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
    element: <Navigate to="/response/map-view" />,
    title: "response",
  },

  {
    path: "/settings",
    element: <SettingsPage />,
    title: "ssettings",
  },
];

export const responseRoutes: RouterType[] = [
  {
    path: "/response/map-view",
    element: <MapView />,
    title: "Map View",
  },
  {
    path: "/response/data-view",
    element: <DataView />,
    title: "Data View",
  },
  {
    path: "/response/activity",
    element: <ActivityPage />,
    title: "Activity",
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
