import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './task.store.ts';
import { dayReducer } from './day.store.ts';
import { scheduleReducer } from './schedule.store.ts';

const rootReducer = combineReducers({
  day: dayReducer,
  schedule: scheduleReducer,
  tasks: taskReducer,
});

export const store = configureStore({ reducer: rootReducer });
