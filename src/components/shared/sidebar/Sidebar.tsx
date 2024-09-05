import { Link } from "react-router-dom";
import logo from "../../../assets/BAMSLogo.svg";
import AccountsIcon from "../icons/AccountsIcon";
import DashboardIcon from "../icons/DashboardIcon";
import InventoryIcon from "../icons/InventoryIcon";
import ReportsIcon from "../icons/ReportsIcon";
import SalesIcon from "../icons/SalesIcon";
import SettingsIcon from "../icons/SeetingIcon";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <DashboardIcon height="21" width="21" className="" />,
    },

    {
      path: "/accounts",
      label: "Accounts",
      icon: <AccountsIcon height="22" width="22" className="" />,
    },

    {
      path: "/reports",
      label: "Reports",
      icon: <ReportsIcon height="22" width="22" className="" />,
    },
    {
      path: "/inventory",
      label: "Inventory",
      icon: <InventoryIcon height="22" width="22" className="" />,
    },
    {
      path: "/sales",
      label: "Sales",
      icon: <SalesIcon height="23" width="23" className="" />,
    },
    {
      path: "/setting",
      label: "Setting",
      icon: <SettingsIcon height="22" width="22" className="" />,
    },
  ];
  return (
    <div className=" h-screen backdrop-blur-[180px] bg-black/35 w-full py-6 px-4">
      <div className="flex items-center gap-3 ps-2.5 mt-0.5">
        <div>
          <img className="mr-5 h-10" src={logo} alt="Logo" />
        </div>
        <h1 className="capitalize text-sm leading-[1rem] font- pb-1">
          Business Account Management Solution
        </h1>
      </div>
      <div className="mt-16">
        <div>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`w-full flex py-3 mb-0.5 px-6  hover:text-ac_primary_1 hover:bg-black/10 rounded-[6px]  ${
                location.pathname === item.path &&
                "text-ac_primary_1 bg-black/10  font-semibold"
              }`}
            >
              <Link to={item.path} className="flex gap-3.5 items-center w-full">
                {item?.icon}
                {/* <img src={item.icon} className="w-5 h-5" alt="" /> */}
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
