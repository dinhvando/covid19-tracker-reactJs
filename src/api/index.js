import React from 'react'
import axios from 'axios';
const countriesURL = 'https://disease.sh/v3/covid-19/countries';
const allURL = 'https://disease.sh/v3/covid-19/all';
const historyURL = 'https://disease.sh/v3/covid-19/historical';
export const fectCountries = async () => {
    const {data} = await axios.get(countriesURL);
    const countryInfo = data.map((item) => {
        return {
            country: item.country,
            flag: item.countryInfo.flag,
            cases: item.cases
        }
    })
    return countryInfo;
}

export const fetchCountryData = async (country) => {
    const {data} = country === 'worldwide' ? await axios.get(allURL) : await axios.get(`${countriesURL}/${country}`)
    return data;
}

export const fetchCountryMonthlyData = async (country) => {
    const {data} =  country === 'worldwide' ? await axios.get(`${historyURL}/all?lastdays=7`) : await axios.get(`${historyURL}/${country}?lastdays=7`);
    if(country === 'worldwide')
    {
        return data;
    }
    else
    {
       return data.timeline;
    }
}