import { call, takeEvery, put, take, race, select } from "redux-saga/effects";
import Axios from "axios";
import {fetchWeather, ICity, selectCities, selectMarkedCity} from "./citiesSlice";
import { sagaActions } from "./sagaActions";

const API_KEY = '96e976770b5d41108851ce7ac9cd9dbf';
const DELAY_MS = 10000;

let callAPI = async ({ url, method, data }: any) => {
    return await Axios({
        url,
        method,
        data
    });
};

function delay(duration: number) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    });
    return promise
}

export function* fetchDataSaga() {
    while(true) {
        try {
            let selectedCityId = yield select(selectMarkedCity);
            let cities = yield select(selectCities);
            let checkedCity = cities.filter((c: ICity) => c.id === selectedCityId)[0];
            if (selectedCityId && checkedCity && checkedCity.name) {
                let result = yield call(() =>
                    callAPI({ url: `http://api.openweathermap.org/data/2.5/weather?q=${checkedCity.name}&appid=${API_KEY}` })
                );
                yield put(fetchWeather(result.data));
            }
            yield call(delay, DELAY_MS)
        } catch (e) {
            yield put({ type: sagaActions.FETCH_WEATHER_FAILURE });
            yield call(delay, DELAY_MS);
        }
    }
}

function* watchPollWeatherSaga() {
    while (true) {
        // @ts-ignore
        yield race([call(fetchDataSaga), take(sagaActions.STOP_POLLING_SAGA)]);
    }
}

export default function* rootSaga() {
    yield takeEvery(sagaActions.START_POLLING_SAGA, watchPollWeatherSaga);
}