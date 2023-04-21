import React from "react"
import { Search } from "../index"
import "./header.css"

const Header = ({ reset, onSetWeatherForecast, onReset }) => {
  const handleWeatherForecast = forecast => {
    onSetWeatherForecast(forecast)
  }

  const handleReset = () => {
    onReset(true)
  }

  return (
    <div className="header">
      <div className="header-left">
        <h1 onClick={handleReset}>My Weather App</h1>
      </div>
      <div className="header-right">
        <Search reset={reset} onSetWeatherForecast={handleWeatherForecast} />
      </div>
    </div>
  )
}

export default Header
