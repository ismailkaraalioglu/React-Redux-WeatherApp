import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (coordinat) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinat.lat}&lon=${coordinat.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return res.data;
  }
);

export const fetchGetCity = createAsyncThunk(
  "weather/getWeatherCity",
  async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return res.data;
  }
);
