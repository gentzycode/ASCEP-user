import { Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";

import routes, {
  democracyRoutes,
  dialogueRoutes,
  landingPages,
  responseRoutes,
  unauthenticatedRoutes,
} from "./routes";
import {
  AuthPagesLayout,
  MainLayout,
  ResponseLayout,
  DemocracyLayout,
  DialogueLayout,
} from "@/layouts";
import config from "@/utils/config";
import { useToast } from "@/components/ui/use-toast";
// import useAutoLogout from "@/hooks/useAuthoLogout";
import { ReportDetailsPage, SurveyDetailsPage } from "./Response";
import SmoothScroll from "@/components/custom/ScrollToTop";
import RepsonseProvider from "@/providers/ResponseProvider";
import { useAppContext } from "@/contexts/AppContext";
import { LoginModal } from "@/components/custom";

const Router = () => {
  const { isLoginModalOpen, onLoginModalClose } = useAppContext();

  const pageRoutes = routes.map(({ path, title, element }: RouterType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  const responsePages = responseRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const democracyPages = democracyRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const dialoguePages = dialogueRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const authRoutes = unauthenticatedRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/auth/${path}`} element={element} />;
    }
  );

  const landingRoutes = landingPages.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/home/${path}`} element={element} />;
    }
  );

  const { toast } = useToast();

  // useAutoLogout();

  // useEffect(() => {
  axios.interceptors.request.use(
    (axiosConfig) => {
      const token = localStorage.getItem(config.key.accessToken);
      if (token) {
        axiosConfig.headers.Authorization = `Bearer ${token}`;
      }
      return axiosConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error?.response?.status === 401) {
          // SIGNOUT LOGIC
        } else {
          if (error?.response?.status === 500) {
            toast({
              title: "Sorry!",
              description: "An error occurred on the server",
              variant: "error",
            });
          } else {
            toast({
              title: "Error!",
              description: error?.response?.data?.message,
              variant: "error",
            });
          }
        }
      } else if (error.request) {
        // LOGIC TO SHOW ERROR MESSAGE
      } else {
        // flash error message
      }

      return Promise.reject(error);
    }
  );
  // }, []);

  return (
    <SmoothScroll>
      <Routes>
        <Route path="/home" element={<Outlet />}>
          {landingRoutes}
        </Route>
        <Route path="/auth" element={<AuthPagesLayout />}>
          {authRoutes}
        </Route>
        <Route path="" element={<MainLayout />}>
          {pageRoutes}
          <Route
            path="response/reports/:reportId"
            element={<ReportDetailsPage />}
          />
          <Route
            path="response/surveys/:surveyId"
            element={<SurveyDetailsPage />}
          />
          <Route
            path=""
            element={
              <RepsonseProvider>
                <ResponseLayout />
              </RepsonseProvider>
            }
          >
            {responsePages}
          </Route>

          <Route path="" element={<DemocracyLayout />}>
            {democracyPages}
          </Route>
          <Route path="" element={<DialogueLayout />}>
            {dialoguePages}
          </Route>
        </Route>

        <Route path="*" element={<div>Route Not Found</div>} />
      </Routes>
      <LoginModal isOpen={isLoginModalOpen} onClose={onLoginModalClose} />
    </SmoothScroll>
  );
};

export default Router;
