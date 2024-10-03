import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { weatherData } from "../../../lib/watherForcast";
import Loader from "../../shared/Loader";




type watherForcastType = {
    temp: number | null;
    feel: string;
    name: string;
    date: number;
    month: string;
    year: number;
    day: string;
}

const WeatherInfo = () => {
    const [weatherInfo, setWeatherInfo] = useState<watherForcastType | undefined>(undefined);

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await weatherData();
            setWeatherInfo(data);
        };
        fetchWeather();
    }, []);

    return <div>
        {weatherInfo ? (
            <div className="flex gap-2 lg:justify-end">
                <div className="bg-black/60 flex flex-col items-center justify-between backdrop-blur-sm w-full lg:min-w-72 min-h-72 p-5 rounded-[10px] text-center weatherFont">
                    <p className="text-2xl">{weatherInfo.year}</p>
                    <div>
                        <p className="text-5xl  font-bold ">{weatherInfo.date}</p>
                        <p className="text-5xl  font-bold">{weatherInfo.month}</p>
                    </div>
                    <p className="text-2xl">{weatherInfo.day}</p>
                </div>
                <div className="bg-black/60 p-5 flex flex-col items-center justify-between backdrop-blur-sm  w-full lg:min-w-72 min-h-72 rounded-[10px] text-center  weatherFont">
                    <p className="text-2xl">Weather today at <br /> {weatherInfo.name}</p>
                    <p>
                        <span className="font-bold text-7xl">
                            {weatherInfo.temp}
                        </span>
                        <sup className="text-4xl">°C</sup></p>
                    <p className=" text-2xl">{weatherInfo.feel}</p>
                </div>


            </div>
        ) : (
            <Loader />
        )}
    </div>
}
















const Dashboard = () => {

    return (
        <div className=" space-y-10 ">
            <div className="flex flex-col xl:flex-row justify-between gap-2">
                <div className=" overflow-hidden relative bg-black/60 backdrop-blur-sm w-full rounded-[10px] p-3 flex flex-col justify-center gap-5">
                    <p> <span className="opacity-80 text-2xl ">Welcome back,</span> <span className="text-3xl font-semibold italic">John Snow !</span></p>
                    <p className="w-[80%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt officiis nisi harum ratione nulla voluptas iste temporibus et dolores inventore! lorem50</p>

                    <div className="absolute opacity-50 bottom-0 right-0">
                        {/* <img className="w-60" src="https://i.ibb.co.com/hWSQMfp/Untitled-design-3.png"/> */}
                        <img className="w-60" src="https://i.ibb.co.com/0VdSgYk/Untitled-design-5.png"/>
                    </div>
                </div>
                <div>
                    <WeatherInfo />
                </div>

            </div>
            <div className="space-y-5 rounded-[10px]">
                <Marquee>
                    {[...new Array(10)].map((_, i) => (
                        <div key={i} className="marquee-item">
                            <img
                                className="h-28 rounded-[10px] object-cover"
                                src="https://i.pinimg.com/564x/e7/e9/9d/e7e99de3fcbf96d1dfda430102ceb662.jpg"
                                alt=""
                            />
                        </div>
                    ))}
                </Marquee>
                <Marquee direction={'right'}>
                    {[...new Array(10)].map((_, i) => (
                        <div key={i} className="marquee-item">
                            <img
                                className="h-28 rounded-[10px] object-cover"
                                src="https://i.pinimg.com/564x/e7/e9/9d/e7e99de3fcbf96d1dfda430102ceb662.jpg"
                                alt=""
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

        </div>
    );
};

export default Dashboard;
