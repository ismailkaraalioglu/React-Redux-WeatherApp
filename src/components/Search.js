import { useState, useEffect } from "react";

// REACT ICONS
import { BiSearch } from "react-icons/bi";
import { IoMdLocate } from "react-icons/io";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../redux/weather/weatherSlice";
import { fetchWeatherData, fetchGetCity } from "../redux/weather/services";

function Search() {
  const [search, setSearch] = useState("");
  const [getCity, setGetCity] = useState(false);
  const getCityCoord = useSelector((state) => state.weatherapp.getCityCoord);
  const weatherGetCityStatus = useSelector(
    (state) => state.weatherapp.weatherGetCityStatus
  );
  const dispatch = useDispatch();

  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          fetchWeatherData({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
        dispatch(changeLocation(true));
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchGetCity(search));
    setGetCity(true);
    dispatch(changeLocation(false));
  };

  useEffect(() => {
    if (weatherGetCityStatus === "succeeded" && getCity) {
      dispatch(fetchWeatherData(getCityCoord));
      setGetCity(false);
    }
  }, [weatherGetCityStatus, getCity, dispatch, getCityCoord]);

  return (
    <>
      <div className="flex items-center justify-center font-light text-lg">
        <div className="dark:text-white">
          <BiSearch size={20} />
        </div>

        <div className="w-56 dark:text-white">
          <form onSubmit={handleSubmit}>
            <input
              className="outline-none w-full pl-3 py-1 bg-transparent"
              placeholder="Search for places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div
          className="cursor-pointer p-1 bg-white rounded-full dark:bg-neutral-700 dark:text-white"
          onClick={getLocation}
        >
          <IoMdLocate size={20} />
        </div>
      </div>
      {weatherGetCityStatus === "failed" && (
        <div className="text-red-600">Please type correct!</div>
      )}
    </>
  );
}

export default Search;
