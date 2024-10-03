import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../components/login/Login";
import Settings from "../components/page/settings/Settings";
import Dashboard from "../components/page/dashboard/Dashboard";
import UnitsWarehouses from "../components/page/inventory/unit-warehouse/UnitsWarehouses";
import Inventory from "../components/page/inventory/Inventory";
import Chalan from "../components/page/order/chalan/Chalan";
import GenerateOrder from "../components/page/order/generate-order/GenerateOrder";
import ChalanSettlement from "../components/page/order/settlement/ChalanSettlement";

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
        path: "/order/generate-order",
        element: <GenerateOrder />,
      },
      {
        path: "/order/chalan",
        element: <Chalan />,
      },
      {
        path: "/order/chalan-settlemenet",
        element: <ChalanSettlement />,
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
