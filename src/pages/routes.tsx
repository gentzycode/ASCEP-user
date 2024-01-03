import { Navigate } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  OTPPage,
  SignupPage,
  TwoFALogin,
} from "./Auth";
import { MainPage } from "./Main";
import { SettingsPage } from "./Settings";
import {
  DebatesHomePage,
  DebateInfoPage,
  InitiativesHomePage,
  ProposalsHomePage,
  SDGsHomePage,
  PublishDebatePage,
  StartProposalPage,
  EditDebatePage,
  ProposalInfoPage,
  ProposalCommuntityHomePage,
  ProposalTopicInfoPage,
  SdgDetailsPage,
  StartInitiativePage,
  ResolveSharedIDPage,
  VotingHomePage,
  StartPollPage,
  EditProposalPage,
  InitiativeInfoPage,
  EditInitiativePage,
  BudgetingHomePage,
  WardProjectsHomePage,
  VotingInfoPage,
  ConfigureVotingPage,
  EditVotePage,
} from "./Democracy";
import { ActivityPage, DataView, MapView } from "./Response";
import DebateProvider from "@/contexts/DebateContext";
import { ContactUs, LandingPage } from "./Landing";
import ProposalProvider from "@/contexts/ProposalContext";
import InitiativeProvider from "@/contexts/InitiativeContext";
import DemocracyLandingePage from "./Democracy/landing-page";
import VotingProvider from "@/contexts/VotingContext";
import {
  BrowseRequestHomePage,
  CreateRequestPage,
  DialoguLandingPage,
  DialogueHelpHomePage,
  MakeARequestHomePage,
  RequestInfoPage,
  ViewAuthoritiesHomePage,
} from "./Dialogue";

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
    path: "/response",
    element: <Navigate to="/response/map-view" />,
    title: "response",
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    title: "ssettings",
  },
  {
    path: "/democracy",
    element: <DemocracyLandingePage />,
    title: "democracy",
  },
];

export const dialogueRoutes: RouterType[] = [
  {
    path: "/dialogue",
    element: <DialoguLandingPage />,
    title: "dailogue",
  },
  {
    path: "/dialogue/make-a-request",
    element: <MakeARequestHomePage />,
    title: "dailogue",
  },
  {
    path: "/dialogue/make-a-request/create-request",
    element: <CreateRequestPage />,
    title: "dailogue-create-request",
  },
  {
    path: "/dialogue/browse-request",
    element: <BrowseRequestHomePage />,
    title: "dailogue-request",
  },
  {
    path: "/dialogue/browse-request/:requestId",
    element: <RequestInfoPage />,
    title: "dailogue-request-info",
  },
  {
    path: "/dialogue/view-authorities",
    element: <ViewAuthoritiesHomePage />,
    title: "dailogue",
  },
  {
    path: "/dialogue/dialogue-help",
    element: <DialogueHelpHomePage />,
    title: "dailogue",
  },
];

export const democracyRoutes: RouterType[] = [
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
    element: <DebateInfoPage />,
    title: "democracy-debate-info",
  },
  {
    path: "/democracy/debates/publish-debate",
    element: <PublishDebatePage />,
    title: "democracy-debate-start",
  },
  {
    path: "/democracy/debates/edit-debate/:debateId",
    element: <EditDebatePage />,
    title: "democracy-debate-start",
  },
  {
    path: "/democracy/share/:shareableId",
    element: <ResolveSharedIDPage />,
    title: "democracy-shared-id",
  },
  {
    path: "/democracy/proposals",
    element: (
      <ProposalProvider>
        <ProposalsHomePage />
      </ProposalProvider>
    ),
    title: "democracy-proposals",
  },
  {
    path: "/democracy/proposals/:proposalId",
    element: <ProposalInfoPage />,
    title: "democracy-proposal-info",
  },
  {
    path: "/democracy/proposals/start-proposal",
    element: <StartProposalPage />,
    title: "democracy-proposals-start",
  },
  {
    path: "/democracy/proposals/edit-proposal/:proposalId",
    element: <EditProposalPage />,
    title: "democracy-proposals-start",
  },
  {
    path: "/democracy/proposals/community/:proposalId",
    element: <ProposalCommuntityHomePage />,
    title: "democracy-proposals-community",
  },
  {
    path: "/democracy/proposals/community/topic/:topicId",
    element: <ProposalTopicInfoPage />,
    title: "democracy-proposals-community",
  },
  {
    path: "/democracy/initiatives",
    element: (
      <InitiativeProvider>
        <InitiativesHomePage />
      </InitiativeProvider>
    ),
    title: "democracy-initiatives",
  },
  {
    path: "/democracy/initiatives/start-initiative",
    element: <StartInitiativePage />,
    title: "democracy-initiatives-start",
  },
  {
    path: "/democracy/initiatives/:initiativeId",
    element: <InitiativeInfoPage />,
    title: "democracy-initiatives-info",
  },
  {
    path: "/democracy/initiatives/edit-initiative/:initiativeId",
    element: <EditInitiativePage />,
    title: "democracy-initiatives-edit",
  },
  {
    path: "/democracy/sdg",
    element: <SDGsHomePage />,
    title: "democracy-SDGs",
  },
  {
    path: "/democracy/sdg/details",
    element: <SdgDetailsPage />,
    title: "democracy-SDGs-details",
  },
  {
    path: "/democracy/voting",
    element: (
      <VotingProvider>
        <VotingHomePage />
      </VotingProvider>
    ),
    title: "democracy-voting",
  },
  {
    path: "/democracy/voting/:pollId",
    element: <VotingInfoPage />,
    title: "democracy-voting-info",
  },
  {
    path: "/democracy/voting/start-poll",
    element: <StartPollPage />,
    title: "democracy-SDGs-start",
  },
  {
    path: "/democracy/voting/configure/:pollId",
    element: <ConfigureVotingPage />,
    title: "democracy-SDGs-start",
  },
  {
    path: "/democracy/voting/edit-vote/:pollId",
    element: <EditVotePage />,
    title: "democracy-SDGs-start",
  },
  {
    path: "/democracy/budgeting",
    element: <BudgetingHomePage />,
    title: "democracy-budgeting",
  },
  {
    path: "/democracy/budgeting/ward-project/:wardId",
    element: <WardProjectsHomePage />,
    title: "democracy-budgeting-ward-project",
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
  // {
  //   path: `/response/1`,
  //   element: <ViewResponsePage />,
  //   title: "View Response",
  // },
];

export const unauthenticatedRoutes: RouterType[] = [
  {
    path: "signup",
    element: <SignupPage />,
    title: "signup",
  },
  {
    path: "2fa-login",
    element: <TwoFALogin />,
    title: "2fa-login",
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
