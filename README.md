## Setup Guide

- Make a `.env` file.
- Paste this two variables that are the api url 
`VITE_GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q='`
`VITE_WEATHER_API_URL = 'https://api.openweathermap.org/data/3.0/onecall?&exclude=current,minutely,hourly,alerts&units=metric&appid='`
- Make an account on [OpenWeather.org](https://openweathermap.org/)
- Click on your `avatar/username` in navbar.
- Click on `My API Keys`.
- Generate a `key` if there is none.
- Copy the `Key` and paste in `.env` file with the name `VITE_API_KEY`.
- Install the node modules with `npm i` or `yarn install`.
- Run the application using `npm run dev` or `yarn dev`.
- If you want to delete the node_modules you can execute `npm run clean` or `yarn clean` 

## Explanation to some changes I made

- As in the problem description I saw that when you are viewing the detailed forecast, the user won't be able to return to the daily forecast I add the function that if you click again on the weather card you will return to the daily forecast.
- I also added some errors when the city is not found or you don't search any city.
- Related to the first one I add the title of the weather button as a button if you want to come back again to the main page.

