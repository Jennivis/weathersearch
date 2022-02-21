import axios from 'axios';
import React, {  useState } from 'react';
import './App.css';

const API_KEY = ""
const ICON_URL = "https://openweathermap.org/img/wn/";

function App() {

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("0");
  const [feelsLike, setFeelsLike] = useState ("0");
  const [windSpeed, setWindSpeed] = useState("0");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const getWeatherData = (city) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fi`
    })
      .then((response) => {
      console.log(response.data.main.temp);
      setTemp(response.data.main.temp);
      setWindSpeed(response.data.wind.speed);
      setFeelsLike(response.data.main.feels_like);
      setDescription(response.data.weather[0].description);
      setIcon(ICON_URL + response.data.weather[0].icon + "@2x.png");
    }).catch (error => {
      alert(error + ". Jokin meni pieleen... Paikkakunta puuttuu tai on virheellinen.");
    });
  }

  return (
  <>
    <h2>Hae päivän säätiedot</h2>
    <div className="container">
      <div className="card">
        <input type="text" className="search-city" placeholder="Syötä paikkakunta" value={city} onChange={(e) => setCity(e.target.value)}/>
        <button className="btn" onClick={() => {
          getWeatherData(city);
        }}>Hae</button>
        <div className="results">
          <p className="city">{city}</p>
          <p className="temp">Lämpötila: {Math.round(temp)} &#176;C</p>
          <p>Tuulen voimakkuus {Math.round(windSpeed)} m/s</p>
          <p>Tuntuu kuin {Math.round(feelsLike)} &#176;C</p>
          <p className="desc">{description}</p>
          <img src={icon} alt=""/>
        </div>
      </div>
    </div>
  </>   
  );
}

export default App;