import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../app/store';

export interface IWeather {
  cityName: string;
  temp: string;
  pressure: string;
  humidity: string;
}
export interface ICity {
  name: string;
  id: string;
}

interface ICitiesState {
  value: ICity[];
  selectedCity: string;
  weather: IWeather;
}

const initialState: ICitiesState = {
  value: [],
  selectedCity: '',
  weather: {
    cityName: 'No city selected',
    temp: 'n/a',
    pressure: 'n/a',
    humidity: 'n.a'
  },
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      const isAlreadyOnList = !!state.value.filter((city) => city.name === action.payload).length;
      if (!isAlreadyOnList){
        state.value = [
          ...state.value,
          {
            name: action.payload,
            id: uuidv4(),
          }
        ];
      }
      return;
    },
    removeCity: (state, action: PayloadAction<string>) => {
      const newStateValue = state.value.filter((city) => city.name !== action.payload);
      state.value = newStateValue;
    },
    fetchWeather: (state, action: PayloadAction<any>) => {
      console.log('fetch weather', action.payload)
      state.weather = {
        cityName: action.payload.name,
        temp: action.payload.main.temp,
        pressure: action.payload.main.pressure,
        humidity: action.payload.main.humidity
      };

      return;
    },
    selectCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload
    }
  },
});

export const { addCity, removeCity, fetchWeather, selectCity } = citiesSlice.actions;
export const selectCities = (state: RootState) => state.cities.value;
export const selectMarkedCity = (state: RootState) => state.cities.selectedCity;
export const selectWeather = (state: RootState) => state.cities.weather;

export default citiesSlice.reducer;
