import { createSlice } from "@reduxjs/toolkit";

import { fetchWeatherData, fetchGetCity } from "./services";

export const weatherSlice = createSlice({
  name: "weatherapp",
  initialState: {
    weatherTheme: window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : null,
    weatherDataStatus: "idle",
    weatherGetCityStatus: "idle",
    weatherCurrentData: [],
    weatherCurrentCity: "",
    weatherDailyData: [],
    getCityCoord: {},
    locationActive: false,
    getCityName: "",
    isWeatherDataError: null,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.weatherTheme = action.payload;
    },
    changeLocation: (state, action) => {
      state.locationActive = action.payload;
    },
  },
  extraReducers: {
    [fetchWeatherData.pending]: (state) => {
      state.weatherDataStatus = "loading";
    },
    [fetchWeatherData.fulfilled]: (state, action) => {
      state.weatherDataStatus = "succeeded";
      const { current, daily, timezone } = action.payload;
      state.weatherCurrentData = current;
      state.weatherDailyData = daily;
      const sliceTimezone = timezone.indexOf("/");
      const result = timezone.slice(sliceTimezone + 1);
      state.weatherCurrentCity = result;
    },
    [fetchWeatherData.rejected]: (state, action) => {
      state.weatherDataStatus = "failed";
      state.isWeatherDataError = action.error.message;
    },
    [fetchGetCity.pending]: (state) => {
      state.weatherGetCityStatus = "loading";
    },
    [fetchGetCity.fulfilled]: (state, action) => {
      state.weatherGetCityStatus = "succeeded";
      const { coord, name } = action.payload;
      state.getCityCoord = coord;
      state.getCityName = name;
    },
    [fetchGetCity.rejected]: (state, action) => {
      state.weatherGetCityStatus = "failed";
      state.isWeatherDataError = action.error.message;
    },
  },
});

export const { changeTheme, changeLocation } = weatherSlice.actions;

export default weatherSlice.reducer;
