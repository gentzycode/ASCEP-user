import About from "./About";
import Home from "./Home";

const routes: RouterType[] = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "about",
    element: <About />,
    title: "about",
  },
];

export default routes;
