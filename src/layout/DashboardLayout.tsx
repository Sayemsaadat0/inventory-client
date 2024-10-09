// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/shared/sidebar/Sidebar";
// import { useBackground } from "../components/context/BackgroundContext";
// import TopNavbar from "../components/shared/navbar/TopNavbar";
// import SettingsComponent from "../components/settings/SettingsComponent";

// const DashboardLayout: React.FC = () => {
//   const { displayedBackground } = useBackground();
//   return (
//     <div
//       className="min-h-screen relative"
//       style={{
//         backgroundImage: `url("${displayedBackground}")`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundAttachment: 'fixed'
//       }}
//     >
//       <div className="absolute bottom-[10%] right-0 z-50" >
//         <SettingsComponent />
//       </div>
//       <div className="flex">
//         <div className="fixed w-[230px] ">
//           <Sidebar />
//         </div>
//         <div className="flex-1 ml-[230px] ">
//           <div className="bg-black/40">
//             <TopNavbar />
//           </div>
//           <div className="p-4">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;










import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";
// import { useBackground } from "../components/context/BackgroundContext";
import TopNavbar from "../components/shared/navbar/TopNavbar";
import SettingsComponent from "../components/settings/SettingsComponent";
import { useBackground1 } from "../components/context/Background1Context";

const DashboardLayout: React.FC = () => {
  const { displayedBackground } = useBackground1();
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url("${displayedBackground}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute bottom-[10%] right-0 z-50" >
        <SettingsComponent />
      </div>
      <div className="flex">
        <div className="fixed w-[230px] ">
          <Sidebar />
        </div>
        <div className="flex-1 ml-[230px] ">
          <div className="bg-black/40">
            <TopNavbar />
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
