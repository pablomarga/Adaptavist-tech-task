import { useState } from "react"
import { Search, Header, WeatherForecast } from "./components"
import "./App.css"

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [reset, setReset] = useState(0) // use numbers instead of boolean to trigger the useEffect always

  const handleWeatherForecast = weatherForecast => {
    setReset(0)
    setWeatherInfo(weatherForecast)
  }

  const handleOnReset = () => {
    setReset(prevCount => prevCount + 1)
    setWeatherInfo(null)
  }

  return (
    <div className="container">
      <Header
        reset={weatherInfo != null ? true : reset}
        onSetWeatherForecast={handleWeatherForecast}
        onReset={handleOnReset}
      />
      {weatherInfo ? (
        <div className="weather-forecast">
          <WeatherForecast weatherInfo={weatherInfo} />
        </div>
      ) : (
        <div className="initial-body">
          <div className="initial-search">
            <h2>Enter a City and State</h2>
            <div className="body-search-box">
              <Search
                reset={reset}
                onSetWeatherForecast={handleWeatherForecast}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
