import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

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
]);

export default router;
