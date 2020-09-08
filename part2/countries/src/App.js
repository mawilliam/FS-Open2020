// displays information about a country
// data comes from 
//  1. the restcountries API, documentation: https://restcountries.eu/
//  2. the weatherstack API, documentation: https://weatherstack.com/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './components/Content';

const App = () => {
  // state variables
  // filteredCountries required so that the original array does not change
  // otherwise, populating the countries after deleting text from the filter will not work
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filterText, setFilterText] =useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        console.log(response.data);
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterText(event.target.value);
    // filter the list of countries

    const newCountries = event.target.value === ''
      ? countries
      : countries.filter(country => (
        country.name.toLowerCase()
        .includes(event.target.value.toLowerCase())
        ));
    setFilteredCountries(newCountries);
  };

  const handleCountryClick = (event) => {
    console.log('clicked');
    console.log(event.target);
    const newCountry = [filteredCountries[event.target.id]];
    setFilteredCountries(newCountry);
  };

  return (
    <div>
      find countries<input
                      value={filterText}
                      onChange={handleFilterChange} />
      <Content 
        countries={filteredCountries}
        handleCountryClick={handleCountryClick} />
    </div>
  );
};

export default App;
