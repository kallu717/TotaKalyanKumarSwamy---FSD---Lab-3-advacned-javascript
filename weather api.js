const form = document.querySelector('form');
const input = document.querySelector('input');
const submitBtn = document.querySelector('#submit');
const weatherInfo = document.querySelector('#weather-info');
const spinner = document.querySelector('.spinner');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const city = input.value.trim();
	if (city) {
		getWeatherData(city);
	}
});

async function getWeatherData(city) {
	const apiKey = '94ea0b50bd1b37af7fa2ad22a1c15ef5'; 
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	// Display spinner while fetching data
	spinner.style.display = "inline-block";

	try {
		const response = await fetch(url);
		const data = await response.json();
		displayWeatherData(data);
	} catch (error) {
		console.error(error);
		weatherInfo.innerHTML = `<p>Failed to fetch weather data for ${city}.</p>`;
	} finally {
		// Hide spinner after data is fetched
		spinner.style.display = "none";
	}
}

function displayWeatherData(data) {
	const city = data.name;
	const temperature = data.main.temp;
	const description = data.weather[0].description;
	const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

	const html = `
		<h2>${city}</h2>
		<p>${description}</p>
		<img src="${icon}" alt="${description}">
		<p>Temperature: ${temperature} &deg;C</p>
	`;

	weatherInfo.innerHTML = html;
}
