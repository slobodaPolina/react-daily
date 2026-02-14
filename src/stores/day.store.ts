import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { AppState } from './app.store.ts';
import { getStartOfDateInUTC } from '../utils/time.ts';

export const daySelected = createAction<string>('daySelected');

const initialValue = getStartOfDateInUTC().toString();

export const dayValue = createReducer<string>(initialValue, (builder) => {
  builder.addCase(daySelected, (_state, { payload }) => payload);
});

export const dayReducer = combineReducers({
  dayValue,
});

export const selectDay = (state: AppState) => state.day.dayValue;
