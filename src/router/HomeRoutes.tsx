import { Edit } from "../components/pages/Edit";
import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
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
    path: "/setting",
    exact: false,
    children: <Setting />,
  },
  {
    path: "/edit",
    exact: false,
    children: <Edit />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
