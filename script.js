const apiKey = "4ca17ba3111265ceea978a385543bd92"

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener('submit', (e) => {
    e.preventDefault
    // console.log(cityNameEle.value)
    const cityValue = cityNameEle.value

    getWeatherData(cityValue)
})
async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new Error("Network Nhi chl rha")
        }
        const data = await response.json()
        // console.log(data)

        const tempData = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C` ,
            `Humidity: ${data.main.humidity}%` ,
            `Wind Speed: ${Math.floor(data.wind.speed)}m/s` ,
        ]

        weatherDataEle.querySelector('.temp').textContent = `${tempData}°C`
        weatherDataEle.querySelector('.desc').innerHTML = `${description}`.toUpperCase()
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataEle.querySelector('.details').innerHTML = details.map((detail) => {
           return `<div>${detail}</div>`
        }).join("")
    } catch (err) {
        
        weatherDataEle.querySelector('.temp').textContent = ""
        weatherDataEle.querySelector('.desc').innerHTML = ""
        imgIcon.innerHTML = "An Error Occured!!!!"
    }
}