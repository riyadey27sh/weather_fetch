import React from 'react';  
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function WeatherChart({ hourlyData }) {
  const data = hourlyData.map(hour => ({
    time: hour.time.split(' ')[1], 
    temp: hour.temp_c
  }));

  return (
    <div className="chart-container">
      <h3 className="section-title">Today's Hourly Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <XAxis dataKey="time" stroke="#ffffff" fontSize={12} tickLine={false} />
          <YAxis stroke="#ffffff" unit="°" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#00d4ff' }}
          />
          <Line type="monotone" dataKey="temp" stroke="#00d4ff" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;