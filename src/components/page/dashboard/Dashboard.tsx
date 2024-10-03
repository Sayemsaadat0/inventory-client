import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { weatherData } from "../../../lib/watherForcast";




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
            <div>
                <p>Temperature: {weatherInfo.temp}°C</p>
                <p>Weather: {weatherInfo.feel}</p>
                <p>Location: {weatherInfo.name}</p>
                <p>Date: {weatherInfo.day}, {weatherInfo.date} {weatherInfo.month} {weatherInfo.year}</p>
            </div>
        ) : (
            <p>Loading weather data...</p>
        )}
    </div>
}
















const Dashboard = () => {

    return (
        <div>
            <Marquee>
                {[...new Array(10)].map((_, i) => (
                    <div key={i} className="marquee-item">
                        <img
                            className="h-20 object-cover"
                            src="https://i.pinimg.com/564x/e7/e9/9d/e7e99de3fcbf96d1dfda430102ceb662.jpg"
                            alt=""
                        />
                    </div>
                ))}
            </Marquee>

            <WeatherInfo />
        </div>
    );
};

export default Dashboard;
