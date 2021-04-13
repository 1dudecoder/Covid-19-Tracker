import React, { useEffect, useState } from 'react';
import './App.css';
import{MenuItem,FormControl,Select} from "@material-ui/core";

function App() {
    const [countries , setcountries] = useState([]); //inital state 
    const [country, setcountry] = useState("World-wide"); 

    useEffect(() => { // wait to load the data then fire 
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            { 
              name:country.country, //full names of countries 
              value:country.countryInfo.iso2, //short name of countries
            }));

          setcountries(countries);
        })
      };
      getCountriesData();  
      }, []);
        
      const onCountryChange =  (event) => {
        const countryCode = event.target.value;
        // console.log("yoooo  coutry code", countryCode);
        setcountry(countryCode);
      }

  return (
    <div className="app">
    <div className= "app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
          <Select variant = "outlined" onChange={onCountryChange} value={country}>
          {countries.map(country => (
            <MenuItem value = {country.value}>{country.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
    </div>

      <div className="stats"> 
        {/* {Infobox} */}
        {/* {Infobox} */}
        {/* {Infobox} */}
        </div>

    {/* {map} */}

    {/* {table all the coutry} */}
    {/* {graphs of cases} */}

    </div>
  );
}

export default App;
