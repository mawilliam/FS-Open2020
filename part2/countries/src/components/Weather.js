import React from 'react';

const Weather = ( {weatherData} ) => {
    console.log(`Weather data: ${weatherData}`);
    if (weatherData === '') {
        return (<div></div>)
    }else {
        return (
            <>
                <div>
                    <strong>temperature:</strong> {weatherData.current.temperature} Celsius
                </div>                
                <div>
                    {weatherData.current.weather_icons.map((icon, i) => (
                        <img 
                            key={i}
                            src={icon}
                            alt={icon} />
                    ))}
                </div>
                <div>
                    <strong>wind:</strong>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}
                </div>
            </>
        )
    }
};

export default Weather;
