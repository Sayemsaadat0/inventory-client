import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../../assets/BAMSLogo.svg";
import logo1 from '/Logo.png'
import DashboardIcon from "../icons/DashboardIcon";
// import AccountsIcon from "../icons/AccountsIcon";
import InventoryIcon from "../icons/InventoryIcon";
import SalesIcon from "../icons/SalesIcon";
// import ReportsIcon from "../icons/ReportsIcon";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";


// import SettingsIcon from "../icons/SeetingIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import EntityIcon from "../icons/EntityIcon";
import { useUser } from "../../context/UserProvider";
import { IoLogOut } from "react-icons/io5";


const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Admin",
      icon: <MdOutlineAdminPanelSettings className="text-2xl" />,
      subRoutes: [
        // { path: "/entity/companies", label: "Initiate Company" },
        { path: "/admin/users", label: "Enroll User" },
        { path: "/admin/collect-bill", label: "Collect Bill" },
      ],
    },
    {
      label: "Entities",
      icon: <EntityIcon />,
      subRoutes: [
        // { path: "/entity/companies", label: "Initiate Company" },
        { path: "/entity/customers", label: "Register Customer" },
        { path: "/entity/products", label: "Add Products" },
        { path: "/entity/payment-type", label: "Payment Type" },
        { path: "/entity/ledgers", label: "Ledger Setup" },
      ],
    },
    {
      label: "Inventory",
      icon: <InventoryIcon />,
      subRoutes: [
        { path: "/stock-overview/unit", label: "Units" },
        { path: "/stock-overview/warehouse", label: "Warehouses" },
        { path: "/stock-overview", label: "Stock Overview" },
      ],
    },
    {
      label: "Order",
      icon: <SalesIcon />,
      subRoutes: [
        { path: "/order/generate-order", label: "Generate Sales" },
        { path: "/order/chalan", label: "Issue Chalan" },

      ],
    },
    {
      path: "/send-message",
      label: "Message",
      icon: <LuMessageSquare className="text-xl" />,
    },
    // {
    //   path: "/setting",
    //   label: "Setting",
    //   icon: <SettingsIcon />,
    // },
  ];


  const { user , logout } = useUser();
  const navigate = useNavigate();
  console.log(user)
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="h-screen  w-full py-4  flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 ps-2.5 mt-0.5 ">
          <img className="h-12" src={logo1} alt="Logo" />
          <h1 className="capitalize text-xs leading-[1rem]  pb-1">
            BAITS Inventory Management Solution
          </h1>
        </div>

        <div className="mt-5 px-2.5">
          <div>
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.subRoutes ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className=" w-full py-2 mb-0.5 px-2 hover:bg-black/35 rounded-[6px] text-xs">
                        <span className="flex items-center gap-3">  {item.icon}
                          {item.label}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="">
                          {item.subRoutes.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`flex my-1 items-center w-full py-3  text-xs px-6 hover:bg-black/25 rounded-[6px]  ${location.pathname === subItem.path && "bg-black/25 font-semibold"
                                }`}
                            >
                              <div className="w-3 h-3 bg-white/60 rounded-full mx-2"></div>
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
                    className={`flex gap-3.5 items-center w-full  text-xs py-2 mb-0.5 px-2 hover:bg-black/35 rounded-[6px] ${location.pathname === item.path && "bg-black/35 font-semibold"
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

      <div className="p-2 py-10 m-3 rounded-[10px] bg-black/50 space-y-3">
        <div>
          <img className="w-16 rounded-full mx-auto" src={user?.user_image} alt="" />
        </div>
        <div className="text-center">
          <p className="text-[20px] font-semibold text-white/80"> {user?.username}</p>
          <p className="opacity-50">{user?.role}</p>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center bg-white text-black w-fit gap-2  mx-auto p-2 rounded-full cursor-pointer duration-300 transition-all hover:-translate-y-1"
        >
          Sign out <IoLogOut className="text-2xl"></IoLogOut>
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