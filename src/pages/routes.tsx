import { SignupPage } from "./Auth";
import ForgotPasswordPage from "./Auth/forgot-password";
import LoginPage from "./Auth/login";
import OTPPage from "./Auth/otp";
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
