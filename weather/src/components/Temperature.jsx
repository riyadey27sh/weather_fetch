import React from "react";
import '../index.css';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
function Temperature(props){
return (
<div className="temp">
    <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>{props.location}</h2>
    <img src={`https:${props.img} `} alt="icon" />
    <p style={{fontSize:"5rem"}}><DeviceThermostatIcon className="therm" sx={{fontSize:100}}/> {props.value} ºC</p>
    <p >{props.climate}</p>
</div>
)
}

export default Temperature;