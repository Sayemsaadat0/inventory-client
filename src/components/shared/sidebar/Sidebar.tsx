import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/BAMSLogo.svg";
import AccountsIcon from "../icons/AccountsIcon";
import DashboardIcon from "../icons/DashboardIcon";
import InventoryIcon from "../icons/InventoryIcon";
import ReportsIcon from "../icons/ReportsIcon";
import SalesIcon from "../icons/SalesIcon";
import SettingsIcon from "../icons/SeetingIcon";
import LogOutIcon from "../icons/LogOutIcon";

const Sidebar = () => {
  const location = useLocation();
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
      path: "/reports",
      label: "Reports",
      icon: <ReportsIcon height="22" width="22" className="" />,
    },
    {
      path: "/setting",
      label: "Setting",
      icon: <SettingsIcon height="22" width="22" className="" />,
    },
  ];
  return (
    <div className=" h-screen backdrop-blur-[180px] bg-black/35 w-full py-6 px-4 flex flex-col justify-between">
      <div className="">
        <div className="flex items-center gap-3 ps-2.5 mt-0.5">
          <div>
            <img className="mr-5 h-10" src={logo} alt="Logo" />
          </div>
          <h1 className="capitalize text-sm leading-[1rem] font- pb-1">
            Business Account Management Solution
          </h1>
        </div>
        <div className="mt-16 px-2.5">
          <div>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`w-full flex py-3 mb-0.5 px-6  hover: hover:bg-black/35 rounded-[6px]  text-sm ${
                  location.pathname === item.path &&
                  " bg-black/35  font-semibold"
                }`}
              >
                <Link
                  to={item.path}
                  className="flex gap-3.5 items-center w-full"
                >
                  {item?.icon}
                  {/* <img src={item.icon} className="w-5 h-5" alt="" /> */}
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="border-t opacity-15 mx-6"></div>
        <div className="flex gap-2 items-center ps-2.5 pt-8">
          <div>
            <img
              className="w-10 h-10 object-cover mx-1 rounded-full"
              src={
                "https://www.wikihow.com/images/thumb/a/a0/4_elements.jpg/728px-4_elements.jpg"
              }
              // src={user_image || "/user1.png"}
              alt="user-imahge"
            />
          </div>
          <div className=" text-left">
            <p className="font-medium  capitalize text-lg">
              Cameron Williamson
            </p>
            <p className="opacity-75 text-xs -mt-0.5">
              bill.sanders@example.com
            </p>
          </div>
        </div>
        <div className="mx-2">
          <button
            className={`w-full flex py-3 mb-0.5 px-6  hover: hover:bg-red-900/55 rounded-[6px]  text-sm mt-3.5 `}
          >
            <span className="flex gap-3.5 items-center w-full">
              <LogOutIcon height="26" width="26" className="" /> Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
