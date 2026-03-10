import React, { useState } from 'react';
import Input from "./components/Input.jsx";
import Temperature from "./components/Temperature.jsx";
import Components from "./components/Components.jsx";
import WavesIcon from '@mui/icons-material/Waves';
import AirIcon from '@mui/icons-material/Air';
import img from '../src/assets/wired-flat-809-rain-sunny.svg'
import './App.css';
import './index.css';



function App() {
   const [status, setStatus] = useState(""); 
  const [city,setCity]=useState("");
  const[result,setResult]=useState({});
  
   

function checkWeather(city){
  const apiKey = "f5862a49a4314a24b91174015262602";
  const apiUrl = "https://api.weatherapi.com/v1/current.json";
setStatus("loading");
  fetch(`${apiUrl}?key=${apiKey}&q=${city}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setStatus("error");
        setResult(null);
      } else {
        setStatus("success");
        setResult(data);
      }
    });

}

   function handleChange(e){
    const value=e.target.value;
    setCity(value);
   }
   
   function afterClick(){
     checkWeather(city);
     
   }

  
   

 return(   
   <div className="container">
      
     <Input change={handleChange} click={afterClick}    />

     {status==="loading" && (
  <p style={{ color:"white",marginTop:"10px",fontSize:'3rem'}}> Loading weather...  </p>
)}
     
       {status==="success" && (
    <>
      <Temperature img={result.current?.condition?.icon} climate={result.current?.condition?.text} value={result.current?.temp_c} />
      
    </>
  )}

  {status==="error" && <p style={{color:"red",fontSize:"4rem"}}>City not found!!!</p>}
  
  
    {status==='success' && 
    (<div className='components'>
      <Components
       value={result.current?.humidity}
      icon={WavesIcon}
      type="Humidity"
      unit="%"
    />

    <Components
       value={result.current?.wind_kph}
      icon={AirIcon}
      type="Wind Speed"
      unit="km/h"
    />
    </div>
  )}
  

    </div>
  
 )
}

export default App;
