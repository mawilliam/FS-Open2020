import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather'

const api_key = process.env.REACT_APP_API_KEY;

const Country = ( {country} ) => {
    const [weatherData, setWeather] = useState('');

    useEffect(() => {
        console.log('weather effect');
        const apiURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
        axios
            .get(apiURL)
            .then(response => {
                console.log('weather promise fulfilled');
                setWeather(response.data);
            });
    }, [country.capital]);

    return (
        <div>
            <h1>{country.name} </h1>
            <p>capital {country.capital} </p>
            <p>population {country.population} </p>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((language, i) => (
                    <li key={i}>{language.name} </li>
                ))}
            </ul>
            <img 
                src={country.flag}
                alt={country.name}
                width="500"
                height="250" />
            <h2>Weather in {country.capital} </h2>
            <Weather weatherData={weatherData} />
        </div>
    )
};

export default Country;
