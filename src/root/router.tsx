import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../components/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        // element: <Home />,
      },
      {
        path: "/about",
        // element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
