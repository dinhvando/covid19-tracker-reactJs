import React,{ useEffect} from 'react'
import './App.css';
import classNames from 'classnames';

import {InfoBox} from './components/InfoBox'
import {Card, CardContent, Typography,FormControl, Select, MenuItem} from '@material-ui/core';
import styled from 'styled-components';
import WHO from './assets/img/WHO.jpg'
import BoYTe from './assets/img/BoYTe.png'
import {LineGraph} from './components/LineGraph'
import {Map} from './components/Map'
import {RankingTable} from './components/Table'
import "leaflet/dist/leaflet.css";

import {sortData} from './utils'
// redux
import {useSelector, useDispatch} from 'react-redux'
import {fetchCountry} from './store/country'
import {changeCountry} from './store/country'
import {fetchGlobalData} from './store/country'
import {fetchHistoryCountryData} from './store/country'
import {changeCaseType, setCenter} from './store/Map'
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
  const dispatch = useDispatch();
  const countryList = useSelector(state => state.country.countryInfo);
  const currentCountry = useSelector(state => state.country.currentCountry);
  const globalData = useSelector(state => state.country.globalData);
  const historyData = useSelector(state => state.country.historyData);
  const mapCenter = useSelector(state => state.map.mapCenter);
  const mapZoom = useSelector(state => state.map.mapZoom);
  const caseType = useSelector(state => state.map.caseType)
  const currentCountryInfo = countryList.find(country => country.name === currentCountry);
  useEffect(()=>{
    dispatch(fetchCountry())
    dispatch(fetchGlobalData())
    dispatch(fetchHistoryCountryData(currentCountry))
  },[])
  useEffect(()=>{
    dispatch(fetchHistoryCountryData(currentCountry))
    if(currentCountry !== 'worldwide')
    dispatch(setCenter([currentCountryInfo.lat, currentCountryInfo.long]))
    else
    dispatch(setCenter([21, 105.8]))
  },[currentCountry])

  const handleChange = (e) => {
    dispatch(changeCountry(e.target.value))
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
                <Select style={{fontSize:"20px"}} variant="outlined" value={currentCountry}  onChange={handleChange}>
                    <MenuItem style={{fontSize:"20px"}} value = "worldwide">Worldwide</MenuItem>
                   {countryList.map(({name},index) => (<MenuItem key={index} style={{fontSize:"20px"}}  value = {name}>{name}</MenuItem>))}
                </Select>
            </FormControl>
        </Container>
      <div className="app__stats">
        <InfoBox onCLick = {e => dispatch(changeCaseType('cases'))}  title = "Infected" cases ={currentCountry ==='worldwide' ? globalData.todayCases :  currentCountryInfo.todayCases} total={currentCountry ==='worldwide' ? globalData.cases : currentCountryInfo.cases} className={classNames('cardItem', 'cardItem--infected')}/>
        <InfoBox onCLick = {e => dispatch(changeCaseType('recovered'))}   title ="Recovered"cases ={currentCountry ==='worldwide' ? globalData.todayRecovered :  currentCountryInfo.todayRecovered} total={currentCountry ==='worldwide' ? globalData.recovered : currentCountryInfo.recovered}/>
        <InfoBox  onCLick = {e => dispatch(changeCaseType('deaths'))}  title = "Deaths" cases ={currentCountry ==='worldwide' ? globalData.todayDeaths :  currentCountryInfo.todayDeaths} total={currentCountry ==='worldwide' ? globalData.deaths : currentCountryInfo.deaths}/>
      </div>
      <div className="app__chart" >
        <LineGraph data={historyData} />
      </div>

      <Map countries={countryList} casesType={caseType} center={mapCenter} zoom={mapZoom}/>
      </div>
        <Card className="app__right">
              <div className="table__content">
                <h1>Live Cases by Country</h1>
                <RankingTable tableData={ sortData(countryList)}/>
              </div>
        </Card>
    </div>
    
  );
}

export default App;
