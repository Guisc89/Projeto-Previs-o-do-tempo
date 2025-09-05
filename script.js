// Substitui pela tua chave pessoal da API
const apiKey = "93c093a915ae721f9b4f76051b9cf982"; 

document.querySelector(".location").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recarregar a página

    const city = document.getElementById("location").value.trim();

    if (city) {
        getWeather(city);
    } else {
        alert("Por favor, digite uma cidade.");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
);

        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await response.json();
        showWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function showWeather(data) {
    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("weather-info");

    weatherInfo.innerHTML = `
        <h3>Clima em ${data.name}</h3>
        <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
        <p><strong>Sensação térmica:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Condição:</strong> ${data.weather[0].description}</p>
        <p><strong>Umidade:</strong> ${data.main.humidity}%</p>
    `;

    // Remove resultados anteriores e insere o novo
    const container = document.querySelector(".container");
    const oldInfo = document.querySelector(".weather-info");
    if (oldInfo) oldInfo.remove();
    container.appendChild(weatherInfo);
}

