import { Edit } from "../components/pages/Edit";
import { Home } from "../components/pages/Home";
import { Tweet } from "../components/pages/Tweet";
import { UserManagement } from "../components/pages/UserManagement";
import { Page404 } from "../Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/user_management",
    exact: false,
    children: <UserManagement />,
  },
  {
    path: "/tweet",
    exact: false,
    children: <Tweet />,
  },
  {
    path: "/:id/edit",
    exact: false,
    children: <Edit />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
