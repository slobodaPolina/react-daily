import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { getCurrentDay } from '../utils/time.ts';
import { daySelected } from './actions.ts';

export const dayValue = createReducer<number>(getCurrentDay(), (builder) => {
  builder.addCase(daySelected, (_state, { payload }) => payload);
});

export const dayReducer = combineReducers({
  dayValue,
});
