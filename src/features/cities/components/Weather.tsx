import React from 'react';
import { IWeather } from '../citiesSlice';

type WeatherProps = {
    weather: IWeather;
}

export function Weather(props: WeatherProps) {
    const { weather } = props;
    return (
        <div>
            <h4>Weather in: {weather.cityName}</h4>
            <table>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <tr>
                    <td>{weather.temp}</td>
                    <td>{weather.pressure}</td>
                    <td>{weather.humidity}</td>
                </tr>
            </table>
        </div>
    );
}