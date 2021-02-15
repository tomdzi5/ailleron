import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCities, addCity, removeCity, selectMarkedCity, selectCity, selectWeather } from '../citiesSlice';
import { sagaActions } from '../sagaActions';
import { City } from '../components/City';
import { Weather } from '../components/Weather';
import {CitiesList} from "../components/CitiesList";

export function Cities() {
    const cities = useSelector(selectCities);
    const checkedCity = useSelector(selectMarkedCity);
    const weather = useSelector(selectWeather);

    const [inputCity, setInputCity] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: sagaActions.START_POLLING_SAGA });
         return () => { dispatch({ type: sagaActions.STOP_POLLING_SAGA }) }
    }, []);

    const handleCityAdd = () => {
        if (inputCity) {
            dispatch(addCity(inputCity));
            setInputCity('');
            return;
        }

        return;
    };
    const handleCityChange = (city: string) => {
        setInputCity(city);
    };
    const handleDeleteCity = (city: string) => {
        dispatch(removeCity(city))
    };
    const handleCitySelection = (id: string) => {
        dispatch(selectCity(id))
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px' }}>
            <div>
                <label style={{ paddingRight: '10px' }}>
                    Add a city:
                </label>
                <input value={inputCity} onChange={(event) => handleCityChange(event.target.value)}/>
                <button onClick={handleCityAdd}>Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', minHeight: '400px', alignItems: 'center' }}>
                <span style={{ paddingRight: '50px'}}>
                    {cities.length
                        ? <CitiesList cities={cities} onDelete={handleDeleteCity} checkedCity={checkedCity} onCitySelect={handleCitySelection} />
                        : <div>No cities yet, please add some above</div>
                    }
                </span>
                <Weather weather={weather} />
            </div>
        </div>
    );
}
