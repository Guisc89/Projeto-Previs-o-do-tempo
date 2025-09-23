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
        // Busca dados da cidade para obter latitude e longitude
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
        );

        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await response.json();
        const { lat, lon } = data.coord;

        // Busca previsão diária usando latitude e longitude
        const dailyResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&lang=pt_br&units=metric`
        );
        if (!dailyResponse.ok) {
            throw new Error("Erro ao buscar previsão diária");
        }
        const dailyData = await dailyResponse.json();

        showWeather(data, dailyData);
    } catch (error) {
        alert(error.message);
    }
}

function showWeather(data, dailyData) {
    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("weather-info");

    // Log para depuração
    console.log("dailyData:", dailyData);

    // Verifica se daily existe e tem pelo menos dois elementos
    if (!dailyData.daily || dailyData.daily.length < 2) {
        weatherInfo.innerHTML = `
            <h3>Clima em ${data.name}</h3>
            <p>Não foi possível obter a previsão para amanhã.</p>
        `;
    } else {
        const current = dailyData.current;
        const tomorrow = dailyData.daily[1];

        weatherInfo.innerHTML = `
            <h3>Clima em ${data.name}</h3>
            <p><strong>Condição agora:</strong> ${current.weather[0].description}</p>
            <p><strong>Temperatura:</strong> ${current.temp}°C</p>
            <p><strong>Condição amanhã:</strong> ${tomorrow.weather[0].description}</p>
            <p><strong>Min:</strong> ${tomorrow.temp.min}°C,</p>
            <p><strong>Max:</strong> ${tomorrow.temp.max}°C</p>
        `;
    }

    // Remove resultados anteriores e insere o novo
    const container = document.querySelector(".container");
    const oldInfo = document.querySelector(".weather-info");
    if (oldInfo) oldInfo.remove();
    container.appendChild(weatherInfo);
}

