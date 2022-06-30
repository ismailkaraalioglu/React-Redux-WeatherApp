import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./weather/weatherSlice";

export const store = configureStore({
  reducer: {
    weatherapp: weatherSlice,
  },
});
