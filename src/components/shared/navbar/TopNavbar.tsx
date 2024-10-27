import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import "./TopNavbar.css";
import { IoLogOut } from "react-icons/io5";

import { useUser } from "../../context/UserProvider";
// import { useUser } from "../../context/UserProvider";
// import { useEffect } from "react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useUser();

  // useEffect(() => {
  //   // console.log("Navbar: user or loading state updated:", { user, loading });
  // }, [user]);



  // if (!user) {
  //   return <div>No user data found. Please try logging in again.</div>;
  // }
  // const {
  //   email,
  //   username,
  //   user_image,
  // } = user;

  const handleBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
    navigate(1);
  };




  return (
    <div className="py-3 px-4 flex items-center justify-between text-white bg-black/30 backdrop-blur-sm">
      <div className="text-white flex items-center justify-center gap-5">
        <div className="space-x-2">
          <button
            onClick={handleBack}
            className="border p-2 rounded-full text-white hover:bg-[#FFF7D1]/80 hover:text-black"
          >
            <IoChevronBack />
          </button>
          <button
            onClick={handleForward}
            className="border p-2 rounded-full text-white hover:bg-[#FFF7D1]/80 hover:text-black rotate-180"
          >
            <IoChevronBack />
          </button>
        </div>

        <div >
          <motion.div
            key={location?.pathname}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            // viewport={{ once: false }}  // Ensures the
            className="text-sm"
          >
            <p className="text-3xl italic">
              {location?.pathname === "/" && "Home"}
              {location?.pathname === "/entity/companies" && "Companies"}
              {location?.pathname === "/entity/users" && "Users"}
              {location?.pathname === "/entity/customers" && "Customers"}
              {location?.pathname === "/entity/products" && "Items List"}
              {location?.pathname === "/entity/payment-type" && "Payment Type"}
              {location?.pathname === "/entity/ledgers" && "Accounts Head"}
              {location?.pathname === "/stock-overview/unit-warehouse" && "Units & Warehouses"}
              {location?.pathname === "/stock-overview" && "Stock Overview"}
              {location?.pathname === "/order/generate-order" && "Generate Order"}
              {location?.pathname === "/order/chalan" && "Chalan"}
              {location?.pathname === "/order/chalan-settlemenet" && "Chalan Settlement"}
              {location?.pathname === "/setting" && "Settings"}
            </p>

          </motion.div>
        </div>
      </div>
      <div>
        <div
          onClick={logout}
          className="flex items-center gap-2 w-full cursor-pointer duration-300 transition-all hover:-translate-y-1"
        >
          Sign out <IoLogOut className="text-2xl"></IoLogOut>
        </div>

      </div>
    </div>
  );
};

export default TopNavbar;

{/* <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2 items-center ">
              <div>
                <img
                  className="w-10 h-10 object-cover mx-1 rounded-full"
                  src={user_image || "/user1.png"}
                  alt="user-imahge"
                />
              </div>
              <div className="text-white text-left">
                <p className="font-semibold  capitalize text-xl">
                  {username ? username : "Unknown User"}
                </p>
                <p className="opacity-75 text-xs -mt-0.5 ">
                  {email ? email : "Unknown User"}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-60">
            <DropdownMenuItem>
              <Link className="text-sm w-full" to={"/profile"}>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-200 w-full">

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}