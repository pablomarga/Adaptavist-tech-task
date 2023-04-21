import React, { useState, useEffect } from "react"
import "./search.css"

const Search = ({ reset, onSetWeatherForecast }) => {
  const [searchText, setSearchText] = useState("")
  const [cityNotFound, setCityNotFound] = useState(false)
  const [placeholderColor, setPlaceholderColor] = useState("#ccc")

  const setInitialState = () => {
    setSearchText("")
    setCityNotFound(false)
    setPlaceholderColor("#ccc")
  }

  useEffect(() => {
    if (reset) {
      setInitialState()
    }
  }, [reset])

  const getWeatherInfo = async (lat, lon) => {
    const weatherResponse = await fetch(
      `${import.meta.env.VITE_WEATHER_API_URL}${
        import.meta.env.VITE_API_KEY
      }&lat=${lat}&lon=${lon}`
    )
    const weatherData = await weatherResponse.json()
    const { daily: dailyWeather } = weatherData
    const slicedWeatherData = dailyWeather.slice(0, 5)

    return slicedWeatherData
  }

  const formatData = weatherInfo => {
    const lowerCaseText = searchText.toLowerCase() // in order to make sure the formatted text will be correct
    const formattedCity =
      lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1)
    const formattedWeather = weatherInfo.map(
      ({ weather, temp, humidity, dt }) => {
        var date = new Date(0)
        const dateOptions = {
          weekday: "long",
          month: "short",
          day: "numeric",
        }
        date.setUTCSeconds(dt)
        const formattedDate = date.toLocaleDateString("en-US", dateOptions)
        return {
          city: formattedCity,
          weather: weather[0], // in order to avoid an unnecessary array
          temp,
          humidity,
          date: formattedDate,
        }
      }
    )

    return formattedWeather
  }

  const handleSearch = async () => {
    try {
      setCityNotFound(false)
      setPlaceholderColor("#ccc")
      const geoResponse = await fetch(
        `${import.meta.env.VITE_GEOCODING_API_URL}${searchText}&limit=1&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
      const coordinatesData = await geoResponse.json()
      if (coordinatesData.cod === 400) {
        throw new Error("City is empty or doesn't exist. Can not get weather.")
      }

      const { lat, lon } = coordinatesData[0]
      const weatherInfo = await getWeatherInfo(lat, lon)
      const formattedData = formatData(weatherInfo)

      onSetWeatherForecast(formattedData)
      setSearchText("") // Once we searched the city we left the input blank
    } catch (error) {
      console.error(error)
      setCityNotFound(true)
      setPlaceholderColor("red")
    }
  }

  return (
    <div>
      <input
        type="text"
        style={{ "--placeholder-color": placeholderColor }}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder={cityNotFound ? "City not found" : "Eg. London, GB"}
      />
      <button onClick={handleSearch}>Get weather</button>
    </div>
  )
}

export default Search
