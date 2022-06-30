import { useEffect } from "react";
// COMPONENTS
import Sidebar from "./Sidebar";
import Content from "./Content";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/weather/services";
import Loading from "./Loading";
import Error404 from "./Error404";
// DEFAULT CİTY
const defaultCity = { lat: 41.015137, lon: 28.97953 };

function WeatherApp() {
  const weatherDataStatus = useSelector(
    (state) => state.weatherapp.weatherDataStatus
  );
  const isWeatherDataError = useSelector(
    (state) => state.weatherapp.isWeatherDataError
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (weatherDataStatus === "idle") {
      dispatch(fetchWeatherData(defaultCity));
    }
  }, [dispatch, weatherDataStatus]);

  if (weatherDataStatus === "loading") {
    return <Loading />;
  }

  if (weatherDataStatus === "failed") {
    return <Error404 error={isWeatherDataError} />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Content />
    </div>
  );
}

export default WeatherApp;
