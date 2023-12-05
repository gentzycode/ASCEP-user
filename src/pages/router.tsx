import { Route, Routes } from "react-router-dom";
import routes, { responseRoutes, unauthenticatedRoutes } from "./routes";
import { AuthPagesLayout, MainLayout, ResponseLayout } from "@/layouts";

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element }: RouterType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  const responsePages = responseRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const authRoutes = unauthenticatedRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/auth/${path}`} element={element} />;
    }
  );

  return (
    <Routes>
      <Route path="/auth" element={<AuthPagesLayout />}>
        {authRoutes}
      </Route>
      <Route path="" element={<MainLayout />}>
        {pageRoutes}
        <Route path="" element={<ResponseLayout />}>
          {responsePages}
        </Route>
      </Route>
      <Route path="*" element={<div>Route Not Found</div>} />
    </Routes>
  );
};

export default Router;
