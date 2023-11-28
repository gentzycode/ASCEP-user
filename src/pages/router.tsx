import { Route, Routes } from "react-router-dom";
import routes, { unauthenticatedRoutes } from "./routes";
import { useAuthContext } from "@/providers/AuthProvider";
import AuthPagesLayout from "@/layouts/AuthPagesLayout";

const Router = () => {
  const { isLoggedIn } = useAuthContext();

  const pageRoutes = routes.map(({ path, title, element }: RouterType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  const authRoutes = unauthenticatedRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/auth/${path}`} element={element} />;
    }
  );

  return (
    <Routes>
      <Route path="/" element={<></>} />
      {isLoggedIn ? (
        pageRoutes
      ) : (
        <Route path="/auth" element={<AuthPagesLayout />}>
          {authRoutes}
        </Route>
      )}
      <Route path="*" element={<div>Route Not Found</div>} />
    </Routes>
  );
};

export default Router;
