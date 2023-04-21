import React, { useState } from "react"
import { WeatherCard } from "../index"
import "./weather-forecast.css"

const WeatherForecast = ({ weatherInfo }) => {
  const [showDetailedWeather, setShowDetailedWeather] = useState(false)
  const [detailedForecast, setDetailedForecast] = useState(null)

  const handleShowDetailedWeather = indexForecast => {
    setShowDetailedWeather(!showDetailedWeather)
    setDetailedForecast(indexForecast)
  }

  const { city } = weatherInfo != null && weatherInfo[0]

  return (
    <div>
      {!showDetailedWeather ? (
        <div className="weather-city">
          <h1>{city}</h1>
          <div className="weather-daily">
            {weatherInfo.map((info, index) => (
              <div className="weather-day">
                <WeatherCard
                  key={index}
                  index={index}
                  weatherInfo={info}
                  onShowDetailedWeather={handleShowDetailedWeather}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="weather-city" key={detailedForecast}>
          <WeatherCard
            index={detailedForecast}
            weatherInfo={weatherInfo[detailedForecast]}
            onShowDetailedWeather={handleShowDetailedWeather}
          />
          <div className="weather-details">
            <div className="weather-details-item">
              <label>{city}</label>
            </div>
            <div className="weather-details-item">
              <label>{weatherInfo[detailedForecast].weather.description}</label>
            </div>
            <div className="weather-details-item">
              <label>min temp: </label>
              <label>
                {Math.round(weatherInfo[detailedForecast].temp.min)} degrees
              </label>
            </div>
            <div className="weather-details-item">
              <label>max temp: </label>
              <label>
                {Math.round(weatherInfo[detailedForecast].temp.max)} degrees
              </label>
            </div>
            <div className="weather-details-item">
              <label>humidity: </label>
              <label>{weatherInfo[detailedForecast].humidity}</label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherForecast
