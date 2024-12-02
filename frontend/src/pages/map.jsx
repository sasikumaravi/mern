import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";
import axios from "axios";

const Maps = () => {
    const mapKey = "AIzaSyAZvbg8UabGmAdx-Qq6nAWFoG5HnwCYboc";
    const [filteredData, setFilteredData] = useState([])
    const locationPosition = [
        {
            thudiyalur: {
                lat: 11.068020, lng: 76.935577
            }
        },
        {
            saravanampatti: {
                lat: 11.076375, lng: 77.002983
            }
        },
        {
            gandhipuram: {
                lat: 11.0182714, lng: 76.9677744
            }
        },
        {
            ooty: {
                lat: 11.4126769, lng: 76.7030504
            }
        },
        {
            kalapatti: {
                lat: 11.0787684, lng: 77.0370419
            }
        },
        {
            mettupalayam: {
                lat: 11.3059363, lng: 76.9356545
            }
        },
    ]
    useEffect(() => {
        axios.get('http://localhost:5000/event/getevent').then(data => setFilteredData(data.data)).catch(err => console.log(err)
        );
    }, [])
    filteredData.map(x => {
        switch (x.location) {
            case 'Thudiyalur':
                x.position = locationPosition[0].thudiyalur;
                break;
            case 'Saravanampatti':
                x.position = locationPosition[1].saravanampatti;
                break;
            case 'Gandhipuram':
                x.position = locationPosition[2].gandhipuram;
                break;
            case 'Ooty':
                x.position = locationPosition[3].ooty;
                break;
            case 'Kalapatti':
                x.position = locationPosition[4].kalapatti;
                break;
            case 'Mettupalayam':
                x.position = locationPosition[5].mettupalayam;
                break;
            default:
                return x
        }
    })
    console.log('fil', filteredData);
    // console.log('fils', locationPosition[0].thudiyalur);

    return (
        <div className="map-container" >
            <APIProvider apiKey={mapKey}>
                <Map
                    style={{ width: '99vw', height: '75vh' }}
                    defaultCenter={{ lat: 11.0018115, lng: 76.9628425 }}
                    defaultZoom={10}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId='e47e3dc438967ab5'
                >
                    {
                        filteredData.map(items => {
                            return <AdvancedMarker position={items?.position} >
                                <Pin
                                    background={"black"}
                                    borderColor={"green"}
                                    glyphColor={"purple"}
                                />
                            </AdvancedMarker>
                        })
                    }
                    {/* <AdvancedMarker position={{ lat: 11.068020, lng: 76.935577 }} > //Thudiyalur
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 11.076375, lng: 77.002983 }} > //S.patti
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 11.3059363, lng: 76.9356545 }} > //Mettupalayam
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 11.4126769, lng: 76.7030504 }} > //Ooty
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 11.0787684, lng: 77.0370419 }} > //Kalapatti
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 11.0182714, lng: 76.9677744 }} > //gandhipuram
                        <Pin
                            background={"black"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker> */}
                </Map>
            </APIProvider>
        </div>
    );
};

export default Maps;