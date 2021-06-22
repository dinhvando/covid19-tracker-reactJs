import React from 'react'

import { Line } from 'react-chartjs-2';

import numeral from 'numeral'



export const LineGraph = React.memo(({ data}) => {


    const color = {
        cases: 'rgba(0,0,255,0.5)',
        recovered: 'rgba(0,255,0,0.5)',
        deaths: 'rgba(255,0,0,0.5)',
    }
    const caseType = ['cases','recovered','deaths']
    const buildChartData = () => {
        const finalRes = [];
        for(let i = 0; i < caseType.length; i++) {
            const chartDataRes = [];
            let lastDataPoint;
            for (let date in data[caseType[i]]) {
                if(lastDataPoint){
                    const newDataPoint = {
                        x: date,
                        y: data[caseType[i]][date] - lastDataPoint
                    }
                    chartDataRes.push(newDataPoint);
                }
                lastDataPoint = data[caseType[i]][date] 
            }
            finalRes.push(chartDataRes);
        }
      
       return finalRes;
    }
    
    const options = {
        legend: {
           
            labels:{
                font:{
                    size: 20
                }
            }
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
                        labels: getData[0].map(({ x }) => x),
                        datasets: [
                            {
                                data: getData[0].map(({ y }) => parseInt(y)),
                                label: caseType[0],
                                borderColor: color[caseType[0]],
                                fill: false,
                                backgroundColor: color[caseType[0]],
                            },
                            {
                                data: getData[1].map(({ y }) => parseInt(y)),
                                label: caseType[1],
                                borderColor: color[caseType[1]],
                                fill: false,
                                backgroundColor: color[caseType[1]],
                            },
                            {
                                data: getData[2].map(({ y }) => parseInt(y)),
                                label: caseType[2],
                                borderColor: color[caseType[2]],
                                fill: false,
                                backgroundColor: color[caseType[2]],
                            }


                        ]
                    }}
                />)

            }
        </>
    )
})



