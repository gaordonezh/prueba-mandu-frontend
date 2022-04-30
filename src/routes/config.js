import { lazy } from "react";
import Loadable from "./Loadable";
// ----------------------------------------------------------------------
const Page404 = Loadable(lazy(() => import("pages/errors/Page404")));
// ----------------------------------------------------------------------
const MainLayout = Loadable(lazy(() => import("layouts/MainLayout")));
// ----------------------------------------------------------------------
const Home = Loadable(lazy(() => import("pages/Home")));
// ----------------------------------------------------------------------

const routes = [
  {
    path: "/",
    element: MainLayout,
    children: [
      {
        path: "",
        element: Home,
      },
      // EXCEPT
      {
        path: "*",
        element: Page404,
      },
    ],
  },
];

export default routes;
