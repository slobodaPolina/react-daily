import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { equalDates } from '../utils/time.ts';
import { AppState } from './app.store.ts';

export const tasksInit = createAction<Task[]>('tasksInit');
export const taskAdded = createAction<Task>('taskAdded');

export const taskValue = createReducer<Task[]>([], (builder) => {
  builder.addCase(tasksInit, (_state, { payload }) => payload);
  builder.addCase(taskAdded, (state, { payload }) => [...state, payload]);
});

export const taskReducer = combineReducers({
  taskValue,
});

export const selectTasks = (state: AppState) => state.tasks.taskValue;

export const selectTasksByDay = (day: string) => (state: AppState) =>
  selectTasks(state).filter(({ date }) => equalDates(date, day)); // todo or 'once in a month' - same day of another month?
