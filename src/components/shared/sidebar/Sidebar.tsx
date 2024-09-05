import logo from "../../../assets/BAMSLogo.svg";

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
