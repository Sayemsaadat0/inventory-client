import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../components/login/Login";
import Settings from "../components/page/settings/Settings";
import Dashboard from "../components/page/dashboard/Dashboard";
import UnitsWarehouses from "../components/page/inventory/unit-warehouse/UnitsWarehouses";
import Inventory from "../components/page/inventory/Inventory";
import GenerateSales from "../components/page/sales/generate-sales/GenerateSales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/inventory/unit-warehouse",
        element: <UnitsWarehouses />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/sales/generate-sale",
        element: <GenerateSales />,
      },
      {
        path: "/setting",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
