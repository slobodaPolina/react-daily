import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { getCurrentDay } from '../utils/time.ts';

export const daySelected = createAction<number>('daySelected');

export const dayValue = createReducer<number>(getCurrentDay(), (builder) => {
  builder.addCase(daySelected, (_state, { payload }) => payload);
});

export const dayReducer = combineReducers({
  dayValue,
});
