import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";
import { useBackground } from "../components/context/BackgroundContext";

const DashboardLayout: React.FC = () => {
  const { displayedBackground } = useBackground();
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("${displayedBackground}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed'
      }}
    >
      <div className=" flex">
        <div className="fixed w-[320px]">
          <Sidebar />
        </div>
        <div className="flex-1 p-4 ml-[320px] overflow-x-hidden ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
