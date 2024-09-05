import useGetDailyRandomBackground from "../components/hooks/useGetRandomBackground";
import Sidebar from "../components/shared/sidebar/Sidebar";

const DashboardLayout: React.FC = () => {
  const dailyBackground = useGetDailyRandomBackground();
  return (
    <div
      className="min-h-screen w-screen"
      style={{
        backgroundImage: `url("${dailyBackground}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
