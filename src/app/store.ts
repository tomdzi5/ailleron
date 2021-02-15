import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import citiesReducer from '../features/cities/citiesSlice';
import citiesSaga from '../features/cities/citiesSaga'

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    cities: citiesReducer
  },
  middleware
});

sagaMiddleware.run(citiesSaga);

export type RootState = ReturnType<typeof store.getState>;
