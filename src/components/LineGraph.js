import React,{useState,useEffect} from 'react'

import { Line } from 'react-chartjs-2';
import {fetchCountryMonthlyData} from '../api/index'
import numeral from 'numeral'
export const LineGraph = ({ country, caseType }) => {
   const [data,setData] = useState({});

    const color = {
        cases: 'rgba(0,0,255,0.5)',
        recovered: 'rgba(0,255,0,0.5)',
        deaths: 'rgba(255,0,0,0.5)',
    }
    useEffect(()=>{
        const fetchAPI = async() => {
        setData(await fetchCountryMonthlyData(country));
    }
    fetchAPI();
    },[country])
   
    const buildChartData = () => {
        const chartDataRes = [];
        let lastDataPoint;
        for (let date in data[caseType]) {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                }
                chartDataRes.push(newDataPoint);
            }
            lastDataPoint = data[caseType][date] 
           
        }
        return chartDataRes;
    }
    const options = {
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format('+0,0');
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        format: 'MM/DD/YY',
                        tooltipFormat: 'll',
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0.0a");
                        }
                    }
                }
            ]
        }
    }
    const getData = buildChartData();
    return (
        <>
            {getData.length !== 0 &&
                (<Line 
                    data={{
                        labels: getData.map(({ x }) => x),
                        datasets: [
                            {
                                data: getData.map(({ y }) => parseInt(y)),
                                label: caseType,
                                borderColor: color[caseType],
                                fill: true
                            }
                        ]
                    }}
                />)

            }
        </>
    )
}



