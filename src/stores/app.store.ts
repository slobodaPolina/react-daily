import {
  combineReducers,
  configureStore,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import { taskReducer } from './task.store.ts';
import { dayReducer } from './day.store.ts';
import { scheduleReducer } from './schedule.store.ts';
import { iterationReducer } from './iteration.store.ts';

const rootReducer = combineReducers({
  day: dayReducer,
  iterations: iterationReducer,
  schedule: scheduleReducer,
  tasks: taskReducer,
});

export const store = configureStore({ reducer: rootReducer });

type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  undefined,
  UnknownAction
>;
