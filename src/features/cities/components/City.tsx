import React from 'react';

import { ICity } from '../citiesSlice';

type CityProps = {
    city: ICity;
    onDelete: (city: string) => void;
    checked: boolean;
    onCitySelect: (event: any) => void;
}

export function City(props: CityProps) {
    const { city, onDelete, checked, onCitySelect } = props;
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onCitySelect}/>
            </td>

            <td>{city.name}</td>
            <td><button onClick={() => onDelete(city.name)}>remove</button></td>
        </tr>
    );
}