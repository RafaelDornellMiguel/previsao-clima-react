import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "91f745118a3f9dec20376cfb21defd27";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Cidade não encontrada ou erro na API.");
      setWeather(null);
    }
  }

  return (
    <div className="container">
      <h1>Vixus Tech - Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite aqui sua cidade" />
      <button onClick={searchCity}>Verificar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Clima: {weather.weather[0].description}</p>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Sensação Térmica: {weather.main.feels_like}°C</p>
          <p>Umidade: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
