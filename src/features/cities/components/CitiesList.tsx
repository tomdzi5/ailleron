import React from 'react';
import { ICity } from '../citiesSlice';
import { City } from './City';

type CitiesListProps = {
    cities: ICity[];
    onDelete: (city: string) => void;
    checkedCity: string;
    onCitySelect: (event: any) => void;
}

export function CitiesList(props: CitiesListProps) {
    const { cities, onDelete, checkedCity, onCitySelect } = props;
    return (
        <table style={{ border: '1px solid black', padding: '10px'}}>
            <th style={{ padding: '10px'}} >Weather</th>
            <th style={{ padding: '10px'}} >Name</th>
            <th style={{ padding: '10px'}} ></th>
            {cities.map((c) => <City key={c.id} city={c} onDelete={onDelete} checked={checkedCity === c.id} onCitySelect={() => onCitySelect(c.id)} />)}
        </table>
    );
}