import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";
import { useBackground } from "../components/context/BackgroundContext";

const DashboardLayout: React.FC = () => {
  const { displayedBackground } = useBackground();
  // const dailyBackground = useGetDailyRandomBackground();
  return (
    <div
      className="min-h-screen w-screen"
      style={{
        backgroundImage: `url("${displayedBackground}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
