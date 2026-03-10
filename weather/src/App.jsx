import React, { useState, useEffect } from 'react';
import Input from "./components/Input.jsx";
import Temperature from "./components/Temperature.jsx";
import Components from "./components/Components.jsx";
import WeatherChart from "./components/WeatherChart.jsx";
import WeeklyForecast from "./components/WeeklyForecast.jsx";
import WavesIcon from '@mui/icons-material/Waves';
import AirIcon from '@mui/icons-material/Air';
import './App.css';
import './index.css';

function App() {
  const [status, setStatus] = useState(""); 
  const [city, setCity] = useState("");
  const [result, setResult] = useState({});

  // FEATURE 2: Location-Based Weather on Initial Load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          checkWeather(`${lat},${lon}`); // Pass coordinates directly to API
        },
        (error) => {
          console.log("Geolocation denied or failed. Waiting for manual input.");
        }
      );
    }
  }, []);

  // FEATURE 1 & 3: Fetch Forecast & Offline Mode
  function checkWeather(query) {
    const apiKey = "f5862a49a4314a24b91174015262602";
    // Changed endpoint to forecast.json and requested 7 days of data
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`;
    
    setStatus("loading");

    // Check if offline before fetching
    if (!navigator.onLine) {
      loadOfflineData();
      return;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus("error");
          setResult(null);
        } else {
          setStatus("success");
          setResult(data);
          // Save successful fetch to local storage for offline access
          localStorage.setItem('offlineWeatherData', JSON.stringify(data));
        }
      })
      .catch(err => {
        // If fetch fails (e.g., connection drops mid-request), try loading offline data
        loadOfflineData();
      });
  }

  function loadOfflineData() {
    const cachedData = localStorage.getItem('offlineWeatherData');
    if (cachedData) {
      setResult(JSON.parse(cachedData));
      setStatus("success");
      alert("You are offline. Showing last cached weather data.");
    } else {
      setStatus("error");
    }
  }

  function handleChange(e) {
    setCity(e.target.value);
  }
   
  function afterClick() {
    if(city) checkWeather(city);
  }

  return(   
    <div className="container">
      <Input change={handleChange} click={afterClick} />

      {/* FEATURE: Welcome Screen */}
      {status === "" && (
        <div className="welcome-screen">
          <h2>Welcome to WeatherApp</h2>
          <p>Enter a city above or allow location access to get started.</p>
        </div>
      )}

      {status === "loading" && (
        <div className="welcome-screen">
          <h2>Loading weather...</h2>
        </div>
      )}
      
      {status === "success" && result.current && (
        <>
          <Temperature 
            location={result.location?.name}
            img={result.current.condition.icon} 
            climate={result.current.condition.text} 
            value={result.current.temp_c} 
          />
          
          <div className='components'>
            <Components value={result.current.humidity} icon={WavesIcon} type="Humidity" unit="%" />
            <Components value={result.current.wind_kph} icon={AirIcon} type="Wind Speed" unit="km/h" />
          </div>

          <WeatherChart hourlyData={result.forecast.forecastday[0].hour} />
          <WeeklyForecast forecastDays={result.forecast.forecastday} />
        </>
      )}

      {status === "error" && (
        <div className="welcome-screen">
          <h2 style={{ color: "#ff6b6b" }}>City not found!</h2>
          <p>Please check the spelling and try again.</p>
        </div>
      )}
    </div>
  )
}

export default App;