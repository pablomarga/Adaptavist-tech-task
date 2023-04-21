import React, { useState } from "react"
import "./weather-card.css"

const WeatherCard = ({ index, weatherInfo, onShowDetailedWeather }) => {

  const handleWeatherForecast = () => {
    onShowDetailedWeather(index)
  }
  const {
    date,
    weather: { icon },
  } = weatherInfo
  return (
    <div id={index} className="weather-card">
      <button onClick={handleWeatherForecast}>
        <img
          alt="weather"
          className="weather-icon"
          src={`src/assets/${icon}.png`}
        />
        <div className="weather-date">{date}</div>
      </button>
    </div>
  )
}

export default WeatherCard
