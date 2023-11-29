const btnWeather = document.querySelector('.btnWeather')
const inputWeather = document.querySelector('.inputWeather')
const nameCity = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')

const API_KEY = '979046cf3730ad09da6a2e07f6b018db'

const getWeather = (city) => {
  if (city === '') return

  if (city.length < 3) {
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
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${API_KEY}`)
          .then(response => response.json())
          .then(weather => {
            nameCity.textContent = data[0].name
            temperature.textContent = Math.round(weather.current.temp) + ' °C'
            humidity.textContent = 'Humidity: ' + weather.current.humidity + ' %'
            pressure.textContent = 'Pressure: ' + weather.current.pressure + ' hPa'
          })
      })
  } catch (error) {
    inputWeather.classList.add('error')
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
