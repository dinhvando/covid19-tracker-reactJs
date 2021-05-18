import React,{useState, useEffect} from 'react'
import './App.css';
import classNames from 'classnames';
import {Header} from './components/Header'
import {InfoBox} from './components/InfoBox'
import {Card, CardContent, Typography,FormControl, Select, MenuItem} from '@material-ui/core';
import styled from 'styled-components';
import WHO from './assets/img/WHO.jpg'
import BoYTe from './assets/img/BoYTe.png'
import {LineGraph} from './components/LineGraph'
import {Map} from './components/Map'
import {RankingTable} from './components/Table'
import {fectCountries} from './api/index'
import {fetchCountryData} from './api/index'
import {fetchCountryMonthlyData} from './api/index';

import {sortData} from './utils'

const Container = styled.div`
    display: flex;
    justify-content:space-between;
    margin: 10px;
    align-items:center;
`
const Title = styled.h1`
    color: red
`
const MiddleImageList = styled.div`
    display: flex;
    height: 80px;
`
const MiddleImage = styled.img`
    height: inherit;
`
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide'); 
  const [countryInfo,setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);
  useEffect(()=>{
    const fetchAPI = async () =>{
      const countries = await(fectCountries());
      setCountries(countries);
      setTableData(sortData(countries));
    }
    fetchAPI();
  },[])
  useEffect(()=>{
    const fetchAPI = async ()=>{
     setCountryInfo(await fetchCountryData(country));
   
    }
    fetchAPI();
  },[country]) 
  const handleChange = (e) => {
    setCountry(e.target.value)
  }
  return (
    <div className="App">
      <div className="app__left">
      <Container>
            <Title>Covid-19 Tracker</Title>
            <MiddleImageList>
            <MiddleImage src ={WHO}/>
            <MiddleImage src ={BoYTe}/>
            </MiddleImageList>
            <FormControl style ={{minWidth: "200px"}}>
                <Select style={{fontSize:"20px"}} variant="outlined" value={country} onChange={handleChange}>
                    <MenuItem style={{fontSize:"20px"}}  value = "worldwide">Worldwide</MenuItem>
                    {countries.map(country =>(
                        <MenuItem style={{fontSize:"20px"}} value = {country.country}>{country.country} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
      <div className="app__stats">
        <InfoBox  title = "Infected" cases ={countryInfo.todayCases} total={countryInfo.cases} className={classNames('cardItem', 'cardItem--infected')}/>
        <InfoBox title ="Recovered" cases ={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title = "Deaths" cases ={countryInfo?.todayDeaths} total={countryInfo.deaths}/>
      </div>
      <div className="app__chart">
        <LineGraph country={country} caseType="cases"/>
        <LineGraph country={country} caseType="recovered"/>
        <LineGraph country={country} caseType="deaths"/>
      </div>
      </div>
        <Card className="app__right">
              <div className="table__content">
                <h1>Live Cases by Country</h1>
                <RankingTable tableData={tableData}/>
              </div>
        </Card>
    </div>
    
  );
}

export default App;
