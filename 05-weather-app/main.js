const btnWeather = document.querySelector('.btnWeather')
const inputWeather = document.querySelector('.inputWeather')
const nameCity = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')
const selectUnits = document.querySelector('#check')

const API_KEY = '979046cf3730ad09da6a2e07f6b018db'

const getWeather = (city) => {
  let units = ''
  let symbol = ''

  if (selectUnits.checked) {
    units = 'metric'
    symbol = ' °C'
  } else {
    units = 'imperial'
    symbol = ' °F'
  }

  if (city === '') return

  if (city.length <= 3) {
    inputWeather.classList.add('error')

    setTimeout(() => {
      inputWeather.classList.remove('error')
    }, 1000)
    return
  }

  if (inputWeather.classList.contains('error')) {
    inputWeather.classList.remove('error')
  }

  try {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=${units}&appid=${API_KEY}`)
          .then(response => response.json())
          .then(weather => {
            nameCity.textContent = data[0].name
            temperature.textContent = Math.round(weather.current.temp) + symbol
            humidity.textContent = 'Humidity: ' + weather.current.humidity + ' %'
            pressure.textContent = 'Pressure: ' + weather.current.pressure + ' hPa'
          })
      })
  } catch (error) {
    console.log(error)
  }
}

btnWeather.addEventListener('click', () => {
  const city = inputWeather.value
  getWeather(city)
  inputWeather.value = ''
})

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = inputWeather.value
    getWeather(city)
    inputWeather.value = ''
  }
})
