import React, { useEffect, useState } from 'react';
import "./App.css";
import{MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from './util';
import LineGraph from "./LineGraph";
function App() {
    const [countries, setcountries] = useState([]);
    const [country, setcountry] = useState("Worldwide"); 
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData,setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
    }, []);

    useEffect(() => { 
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            { 
              name:country.country, 
              value:country.countryInfo.iso2, 
            }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setcountries(countries);
        })
      };

      getCountriesData();  
      },[]);
        
      const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setcountry(countryCode);

        const url =
          countryCode === "Worldwide" 
                ? 'https://disease.sh/v3/covid-19/all' : 
                `https://disease.sh/v3/covid-19/countries/${countryCode}`;

            await fetch(url)
          .then(response => response.json())
          .then(data => {
            setcountry(countryCode);
            setCountryInfo(data);
          })
      };

      console.log("ur datat " , countryInfo);

  return (
    <div className="app">
    <div className= "app_left">
    <div className= "app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
          <Select variant = "outlined" onChange={onCountryChange} value={country}>
          <MenuItem value = "Worldwide">Worldwide</MenuItem> 

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              
          </Select>
          </FormControl>
    </div>

      <div className="app_stats"> 
            <Infobox title="Corona_Cases" onClick={(e) => setCasesType("cases")} active={casesType === "cases"} cases={countryInfo.todayCases} total={countryInfo.cases}> </Infobox>
            <Infobox title="Corona_Recoverd" onClick={(e) => setCasesType("recovered")} active={casesType === "recovered"} cases={countryInfo.todayRecovered} total={countryInfo.recovered}> </Infobox>
            <Infobox title="Corona_Death" onClick={(e) => setCasesType("deaths")} active={casesType === "deaths"} cases={countryInfo.todayDeaths} total={countryInfo.deaths}> </Infobox>
      </div>
      <Map></Map>
      </div>

    <Card className="app_right">
      <CardContent>
        <h3>Live cases by country </h3>
        <Table countries={tableData} />
        <h3>Worldwide new {casesType}</h3>
        <LineGraph casesType={casesType} />
      </CardContent>
    </Card>

    </div>
  );
};

export default App;
