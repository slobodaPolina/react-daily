import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { equalDates, getStartOfDateInUTC } from '../utils/time.ts';
import { AppState } from './app.store.ts';

export const addTask = createAction<Task>('addTask');

export const taskValue = createReducer<Array<Task>>([], (builder) => {
  builder.addCase(addTask, (state, { payload }) => {
    const task: Task = {
      ...payload,
      date: getStartOfDateInUTC(payload.date),
    };
    return [...state, task];
  });
});

export const taskReducer = combineReducers({
  taskValue,
});

export const selectTasksByDay = (day: Date) => (state: AppState) =>
  state.tasks.taskValue.filter(({ date }) => equalDates(date, day));
