import React, { useState } from "react";
import "./Weather.css";
const api = "https://api.openweathermap.org/data/2.5/";
const apikey = "446827fbc2764fd504e8b334318c3345";
const Weather = () => {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api}weather?q=${query}&units=metric&APPID=${apikey}`)
        .then((res) => res.json())
        .then((data) => {
          setweather(data);

          setquery("");
        })
        .catch((error) => console.log(error));
    }
  };
  console.log(weather);
  const pickdate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let time = d.getTime();
    console.log(time)
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="container">
      <div className="app ">
        <section>
          <div className="search_box">
            <input
              type="text"
              placeholder="search..."
              onChange={(e) => setquery(e.target.value)}
              onKeyPress={search}
              value={query}
              className="search_bar"
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date">{pickdate(new Date())} </div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].description} </div>
              </div>
            </div>
          ) : (
              ""
            )}
        </section>
      </div>
    </div>
  );
};

export default Weather;
