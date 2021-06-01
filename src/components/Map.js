import React from 'react';
import './Map.css';
import { Circle, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';

import numeral from 'numeral';
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      mulitiplier: 800,
    }, 
    recovered: {
      hex: "#7DD71D",
      mulitiplier: 1200,
    },
    deaths: {
      hex: "#1f1d1d",
      mulitiplier: 2000,
    },
};
export const Map = ({countries, casesType, center, zoom}) => {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    return(
       <div className="map">
           <MapContainer >
           <ChangeView center={center} zoom={zoom} />
           <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              {countries.map((country,index) => (
                    <Circle
                    key={index}
                    center={[country.lat, country.long]}
                    fillOpacity={0.4}
                    pathOptions={{
                      color: casesTypeColors[casesType].hex,
                      fillColor: casesTypeColors[casesType].hex,
                    }}
                    radius={
                      Math.sqrt(country[casesType] / 10) * casesTypeColors[casesType].mulitiplier
                    }
                    >
                        <Popup>
                            <div className="info-container">
                                <div
                                    className="info-flag"
                                    style={{ backgroundImage: `url(${country.flag})` }}
                                />
                                <div className="info-name">{country.name}</div>
                                <div className="info-confirmed">
                                    Cases: {numeral(country.cases).format("0,0")}
                                </div>
                                <div className="info-recovered">
                                    Recovered: {numeral(country.recovered).format("0,0")}
                                </div>
                                <div className="info-deaths">
                                    Deaths: {numeral(country.deaths).format("0,0")}
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}
           </MapContainer>
       </div>
    )
}