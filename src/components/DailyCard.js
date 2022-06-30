import React from "react";

function DailyCard({ daily }) {
  return (
    <div className="flex flex-col items-center gap-y-4 bg-white px-8 py-3 rounded-3xl shadow-lg dark:bg-neutral-800 dark:text-white">
      <div className="font-light text-center">
        {new Date(daily.dt * 1000).toLocaleString("en-us", { weekday: "long" })}
        <div className="text-center">
          {new Date(daily.dt * 1000).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <img
        src={require(`../images/${daily.weather[0].icon}.png`)}
        alt="icon"
        className="w-20 mx-auto"
      />
      <div className="text-lg">
        <span>{Math.round(daily.temp.max)}°</span>
        <span> - </span>
        <span className="text-gray-400">{Math.round(daily.temp.min)}° C</span>
      </div>
    </div>
  );
}

export default DailyCard;
