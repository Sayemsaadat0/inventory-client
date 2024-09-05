import useGetDailyRandomBackground from "../components/hooks/useGetRandomBackground";
import { Button } from "../components/ui/button";

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
      <p>Navbar</p>
      <Button variant="outline">Button</Button>
    </div>
  );
};

export default DashboardLayout;
