import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../components/login/Login";
// import Settings from "../components/page/settings/Settings";
import Dashboard from "../components/page/dashboard/Dashboard";
// import UnitsWarehouses from "../components/page/stock/unit-warehouse/UnitsWarehouses";
// import Inventory from "../components/page/inventory/Inventory";
import Chalan from "../components/page/order/chalan/Chalan";
import GenerateOrder from "../components/page/order/generate-order/GenerateOrder";
import StockOverview from "../components/page/stock/stock-overview/StockOverview";
import Company from "../components/page/entities/company/Company";
import Users from "../components/page/admin/users/Users";
import Customers from "../components/page/entities/customer/Customers";
import Products from "../components/page/entities/products/Products";
import PaymentType from "../components/page/entities/payment-type/PaymentType";
import Ledgers from "../components/page/entities/ledgers/Ledgers";
import DownloadChalan from "../components/page/order/chalan/DownloadChalan";
import UnitComponent from "../components/page/stock/unit-warehouse/UnitComponent";
import Warehouses from "../components/page/stock/unit-warehouse/Warehouses";
import PrivateRoute from "../components/shared/PrivateRoute";
import SmsPage from "../components/page/sms/SmsPage";
import CollectBill from "../components/page/admin/bill/CollectBill";
import NotFoundContainer from "../components/NotFoundContainer";
// import PrivateRoute from "../components/shared/";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement : <><NotFoundContainer /></>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      // stock
      {
        path: "/stock-overview/unit",
        element: <UnitComponent />,
      },
      {
        path: "/stock-overview/warehouse",
        element: <Warehouses />,
      },
      {
        path: "/stock-overview",
        element: <StockOverview />,
      },
      // entities
      {
        path: "/entity/companies",
        element: <Company />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/collect-bill",
        element: <CollectBill />,
      },
      {
        path: "/entity/customers",
        element: <Customers />,
      },
      {
        path: "/entity/products",
        element: <Products />,
      },
      {
        path: "/entity/payment-type",
        element: <PaymentType />,
      },
      {
        path: "/entity/ledgers",
        element: <Ledgers />,
      },
      // order
      {
        path: "/order/generate-order",
        element: <GenerateOrder />,
      },
      {
        path: "/order/chalan",
        element: <Chalan />,
      },
      // order
      {
        path: "/send-message",
        element: <SmsPage />,
      },
      {
        path: "/order/chalan/download/:id",
        loader: ({ params }) =>
          fetch(`/order/chalan/download/${params.invoice_id}`),
        element: <DownloadChalan />,
      },

      // report
      // settings
      // {
      //   path: "/setting",
      //   element: <Settings />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
