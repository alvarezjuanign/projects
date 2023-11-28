const btnWeather = document.querySelector('.btnWeather')
const inputWeather = document.querySelector('.inputWeather')

const API_KEY = '979046cf3730ad09da6a2e07f6b018db'
const WEATHER = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
const GEO = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`

const city = inputWeather.value

const getWeather = async () => {
  const res = await fetch(GEO)
  const data = await res.json()

  console.log(data)
}

btnWeather.addEventListener('click', getWeather())
