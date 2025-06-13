const btn = document.getElementById('searchButton');
const input = document.getElementById('inputText');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const cityHumidity = document.getElementById('city-humidity');
const cityWind = document.getElementById('city-wind');
const cityAqi = document.getElementById('city-aqi');

async function getData(cityName) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=93e083156dd14c8f9ac145131251206&q=${cityName}&aqi=yes`
    );
    return await promise.json();
}

btn.addEventListener('click', async () => {
    const value = input.value;
    const result = await getData(value);

    cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
    cityTime.innerText = `Local Time: ${result.location.localtime}`;
    cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
    cityHumidity.innerText = `Humidity: ${result.current.humidity}%`;
    cityWind.innerText = `Wind Speed: ${result.current.wind_kph} kph`;

    const aqi = result.current.air_quality.pm2_5;
    cityAqi.innerText = `PM2.5 AQI: ${aqi.toFixed(2)}`;
});
