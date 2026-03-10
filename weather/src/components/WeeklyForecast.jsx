import React from 'react';

function WeeklyForecast({ forecastDays }) {
  return (
    <div className="forecast-container">
      <h3 className="section-title">7-Day Forecast</h3>
      
      <div className="forecast-scroll">
        {forecastDays.map((day, index) => {
          const dateObj = new Date(day.date);
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={index} className="forecast-card">
              <p className="forecast-day">{dayName}</p>
              <img src={`https:${day.day.condition.icon}`} alt="weather icon" width="50" />
              <p>{day.day.maxtemp_c}º / {day.day.mintemp_c}º</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyForecast;