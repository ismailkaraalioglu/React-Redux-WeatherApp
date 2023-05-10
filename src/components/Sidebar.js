import React from "react";

// MOMENTJS
import moment from "moment";

// COMPONENTS
import Search from "./Search";

// REACT İCONS
import { BsThermometerSun } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";

// REDUX
import { useSelector } from "react-redux";

function Sidebar() {
  const weatherDataStatus = useSelector(
    (state) => state.weatherapp.weatherDataStatus
  );
  const weatherCurrentData = useSelector(
    (state) => state.weatherapp.weatherCurrentData
  );
  const weatherCurrentCity = useSelector(
    (state) => state.weatherapp.weatherCurrentCity
  );
  const getCityName = useSelector((state) => state.weatherapp.getCityName);
  const locationActive = useSelector(
    (state) => state.weatherapp.locationActive
  );

  return (
    <>
      {weatherDataStatus === "succeeded" && (
        <div className="md:max-w-xs md:w-full md:h-screen w-full items-center p-8 flex flex-col dark:bg-neutral-800">
          <Search />

          <div className="my-8">
            <img
              src={require(`../images/${weatherCurrentData.weather[0].icon}.png`)}
              alt="icon"
              width="150px"
              height="150px"
            />
          </div>

          <div className="text-7xl font-light pb-8 dark:text-white">
            {Math.floor(weatherCurrentData.temp)}
            <span>°</span>
            <span className="text-4xl font-normal relative bottom-6">C</span>
          </div>

          <div className="dark:text-white">
            <span className="text-lg">{moment().format("dddd")}</span>,
            <span className="pl-1 text-xl text-gray-400">
              {moment().format("LT")}
            </span>
          </div>

          <hr className="my-8 dark:border-neutral-700" />

          <div className="text-sm dark:text-white">
            <div className="flex mb-3 pl-1">
              <BsThermometerSun size={20} />
              <span className="ml-3">
                Feels like {Math.round(weatherCurrentData.feels_like)} ° C
              </span>
            </div>

            <div className="flex">
              <AiOutlineCloud size={20} />
              <span className="ml-4">
                Cloudly - {weatherCurrentData.clouds}%
              </span>
            </div>
          </div>

          <div className="w-60 h-28 my-9 rounded-3xl relative text-white bg-black">
            <img
              src={require(`../bgrndimg/photo${Math.floor(
                Math.random() * 10
              )}.jpg`)}
              alt="bgrndimg"
              className="w-full h-full rounded-3xl bg-center bg-contain overflow-hidden opacity-50"
            />
            {!locationActive && (
              <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center">
                {getCityName ? getCityName : weatherCurrentCity}
              </span>
            )}

            {locationActive && (
              <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center">
                {locationActive && weatherCurrentCity}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Sidebar);
