import { Link, useLocation } from "react-router-dom";
// import logo from "../../../assets/BAMSLogo.svg";
import logo1 from '/Logo.png'
import DashboardIcon from "../icons/DashboardIcon";
import AccountsIcon from "../icons/AccountsIcon";
import InventoryIcon from "../icons/InventoryIcon";
import SalesIcon from "../icons/SalesIcon";
import ReportsIcon from "../icons/ReportsIcon";
import SettingsIcon from "../icons/SeetingIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"


const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      path: "/accounts",
      label: "Accounts",
      icon: <AccountsIcon />,
    },
    {
      label: "Inventory",
      icon: <InventoryIcon />,
      subRoutes: [
        { path: "/inventory/unit-warehouse", label: "Units & Warehouses" },
        { path: "/inventory", label: "Product Inventory" },
      ],
    },
    {
      label: "Sales",
      icon: <SalesIcon />,
      subRoutes: [
        { path: "/sales/generate-sale", label: "Sale Generate" },
        { path: "/sales/chalan", label: "Create Chalan" },
      ],
    },
    {
      path: "/reports",
      label: "Reports",
      icon: <ReportsIcon />,
    },
    {
      path: "/setting",
      label: "Setting",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <div className="h-screen backdrop-blur-[5px] bg-black/35 w-full py-6  flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 ps-2.5 mt-0.5">
          <img className="h-12" src={logo1} alt="Logo" />
          <h1 className="capitalize text-xs leading-[1rem]  pb-1">
            BAITS Inventory Management Solution
          </h1>
        </div>
        <div className="mt-16 px-2.5">
          <div>
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.subRoutes ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className=" w-full py-3 mb-0.5 px-6 hover:bg-black/35 rounded-[6px] text-xs">
                        <span className="flex items-center gap-3">  {item.icon}
                          {item.label}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-4">
                          {item.subRoutes.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`flex my-1 items-center w-full py-2  text-xs px-6 hover:bg-black/25 rounded-[6px]  ${location.pathname === subItem.path && "bg-black/25 font-semibold"
                                }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex gap-3.5 items-center w-full  text-xs py-3 mb-0.5 px-6 hover:bg-black/35 rounded-[6px] ${location.pathname === item.path && "bg-black/35 font-semibold"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;






















/* 
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
*/