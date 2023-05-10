import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/weather/weatherSlice";

// REACT ICONS
import { WiHumidity } from "react-icons/wi";
import { ImLocation2 } from "react-icons/im";
import { WiBarometer } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";

// COMPONENTS
import DailyCard from "./DailyCard";

function Content() {
  const weatherDailyData = useSelector(
    (state) => state.weatherapp.weatherDailyData
  );
  const weatherCurrentData = useSelector(
    (state) => state.weatherapp.weatherCurrentData
  );
  const weatherDataStatus = useSelector(
    (state) => state.weatherapp.weatherDataStatus
  );
  const weatherTheme = useSelector((state) => state.weatherapp.weatherTheme);

  const dispatch = useDispatch();

  useEffect(() => {
    if (weatherTheme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [weatherTheme]);

  const handleThemeSwitch = () => {
    dispatch(changeTheme(weatherTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {weatherDataStatus === "succeeded" && (
        <div className="md:w-full md:h-screen w-full h-full bg-gray-100 p-8 dark:bg-neutral-800 dark:bg-opacity-95">
          <div className="flex justify-between">
            <h1 className="text-2xl dark:text-white">Week</h1>
            <div>
              <button
                type="button"
                onClick={handleThemeSwitch}
                className="p-2 dark:text-white"
              >
                {weatherTheme === "dark" ? (
                  <BsMoonStars size={25} />
                ) : (
                  <BsSun size={25} />
                )}
              </button>
            </div>
          </div>

          <div className="md:flex md:items-center grid grid-cols-1 gap-y-4 justify-between mt-8">
            {weatherDailyData.slice(1).map((daily, index) => (
              <DailyCard key={index} daily={daily} />
            ))}
          </div>

          <div className="mt-10 dark:text-white">
            <h1 className="text-xl">Today's Highlights</h1>
            <div className="md:grid md:grid-cols-2 md:gap-x-5 grid grid-cols-1">
              <div className="flex flex-col md:pb-5 pb-9 pt-4 pl-7 grow bg-white mt-5 rounded-3xl shadow-lg dark:bg-neutral-800">
                <span className="text-gray-400">Humidity</span>
                <div className="flex mt-6">
                  <span className="inline-block mr-3 bg-green-500 border-2 border-green-800 rounded-full p-1">
                    <WiHumidity size={25} color="white" />
                  </span>
                  <span>
                    <span className="text-3xl">
                      {weatherCurrentData.humidity}
                    </span>
                    %
                  </span>
                </div>
              </div>

              <div className="flex flex-col pb-5 pt-4 pl-7 grow bg-white mt-5 rounded-3xl shadow-lg dark:bg-neutral-800">
                <span className="text-gray-400">Wind Status</span>
                <div className="mt-1">
                  <span className="text-4xl">
                    {weatherCurrentData.wind_speed}
                  </span>{" "}
                  km/s
                </div>
                <div className="flex items-center mt-4 font-light">
                  <div className="inline-block mr-3 bg-blue-600 text-white rounded-full p-2">
                    <ImLocation2 size={18} />
                  </div>
                  SSW
                </div>
              </div>

              <div className="flex flex-col pb-14 pt-4 pl-7 grow bg-white mt-5 rounded-3xl shadow-lg dark:bg-neutral-800">
                <span className="text-gray-400">Pressure</span>
                <div className="flex mt-6">
                  <span className="inline-block mr-3 bg-red-700 border-2 rounded-full p-1">
                    <WiBarometer size={25} color="white" />
                  </span>
                  <span>
                    <span className="text-3xl">
                      {weatherCurrentData.pressure}
                    </span>
                    hPa
                  </span>
                </div>
              </div>

              <div className="flex flex-col pb-14 pt-4 pl-7 grow bg-white mt-5 rounded-3xl shadow-lg dark:bg-neutral-800">
                <span className="text-gray-400">Visibility</span>
                <div className="flex mt-6">
                  <span className="inline-block mr-3 bg-purple-700 border-2 rounded-full p-1">
                    <MdVisibility size={25} color="white" />
                  </span>
                  <span>
                    <span className="text-3xl">
                      {weatherCurrentData.visibility}
                    </span>
                    m
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
