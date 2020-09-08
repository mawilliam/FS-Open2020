import React from 'react';
import Country from './Country';

const Content = ( {countries, handleCountryClick} ) => {
    console.log(countries.length);
    if (countries.length === 0) {
        return (<div></div>)
    } else if (countries.length === 1) {
        return (<Country country={countries[0]} />)
    } else if (countries.length < 11) {
        return (
            <div>
                {countries.map((country, i) => (
                    <div key={i}>
                        {country.name}
                        <button onClick={handleCountryClick} id={i}>
                            show
                        </button>
                    </div>
                    )
                )}
            </div>
        )
    } else {
        return (<p>Too many matches, specify another filter</p>)
    }
};

export default Content;
