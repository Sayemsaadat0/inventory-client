import React from "react";
import { useBackground } from "../../context/BackgroundContext";

const Settings: React.FC = () => {
  const { backgrounds, selectBackground, displayedBackground } =
    useBackground();
  return (
    <div className="">
      <div className="grid grid-cols-9">
        <div className="col-span-4"></div>
        <div className="col-span-3"></div>
        <div className="col-span-2">
          <div className=" bg-black/35 backdrop-blur-[180px] p-6 rounded-md h-[96vh] overflow-y-auto custom-scroll">
            <div className="mb-4">
              <p className="text-xs pb-1">Selected Background</p>
              <img
                src={displayedBackground}
                className="w-full h-36 rounded-md"
                alt=""
              />
            </div>
            <p className="text-xs pb-1">Choose Background</p>
            <div className="grid grid-cols-2 gap-2.5">
              {backgrounds.map((bg, index) => (
                <img
                  key={index}
                  src={bg}
                  alt={`Background ${index + 1}`}
                  className="rounded-md"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => selectBackground(bg)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
