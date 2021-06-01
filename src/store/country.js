import React from 'react'
import axios from 'axios';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
const countriesURL = 'https://disease.sh/v3/covid-19/countries';
const allURL = 'https://disease.sh/v3/covid-19/all';
const historyURL = 'https://disease.sh/v3/covid-19/historical';
export const fetchCountry = createAsyncThunk(
    'fectchCountry',
    async () => {
        const {data} = await axios.get(countriesURL);
        const countryInfo = data.map((item) => {
            return {
                name: item.country,
                flag: item.countryInfo.flag,
                cases: item.cases,
                todayCases: item.todayCases,
                deaths: item.deaths,
                todayDeaths: item.todayDeaths,
                recovered: item.recovered,
                todayRecovered: item.todayRecovered,
                long: item.countryInfo.long,
                lat: item.countryInfo.lat
            }
        })
        return countryInfo;
    }
)
export const fetchGlobalData = createAsyncThunk(
    'fetchGlobalData',
    async () => {
        const {data} = await axios.get(allURL);
        return {
            cases: data.cases,
            todayCases: data.todayCases,
            deaths: data.deaths,
            todayDeaths: data.todayDeaths,
            recovered: data.recovered,
            todayRecovered: data.todayRecovered
        }
    }
)
export const fetchHistoryCountryData = createAsyncThunk(
    'fetchHistoryCountryData',
    async (currentCountry) => {
        try {
            const {data} = currentCountry === 'worldwide' ? await axios.get(`${historyURL}/all?lastdays=7`) :  await axios.get(`${historyURL}/${currentCountry}?lastdays=7`);
            return currentCountry === 'worldwide' ? data : data.timeline
        } catch (error) {
            throw new Error('Country not found or doesnt have any historical data')
        }

    }
)
const countrySlice = createSlice({
    name: 'country',
    initialState:{countryInfo: [],globalData : {},historyData : {}, currentCountry: 'worldwide'},
    reducers:{
        changeCountry(state,action){
            state.currentCountry = action.payload
        }
    },
    extraReducers:{
        [fetchCountry.fulfilled]: (state, action) =>{
            state.countryInfo = [...action.payload]
        },
        [fetchGlobalData.fulfilled]: (state,action) =>{
            state.globalData = action.payload
        },
        [fetchHistoryCountryData.fulfilled]: (state,action) =>{
            state.historyData = action.payload
        }

    },
})

export default countrySlice.reducer
export const {changeCountry} = countrySlice.actions


