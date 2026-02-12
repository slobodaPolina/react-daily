import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { matches, Task } from '../types/task.ts';
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

export const selectTasksByDate = (day: string) => (state: AppState) =>
  selectTasks(state).filter((task) => matches(task, day));
