import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { matches, Task } from '../types/task.ts';
import { AppState } from './app.store.ts';

export const tasksInit = createAction<Task[]>('tasksInit');
export const taskAdded = createAction<Task>('taskAdded');
export const taskEdited = createAction<Task>('taskEdited');
export const taskDeleted = createAction<string>('taskDeleted');

export const taskValue = createReducer<Task[]>([], (builder) => {
  builder.addCase(tasksInit, (_state, { payload }) => payload);
  builder.addCase(taskAdded, (state, { payload }) => [...state, payload]);

  builder.addCase(taskEdited, (state, { payload }) =>
    state.map((task) => (task.uuid === payload.uuid ? payload : task)),
  );

  builder.addCase(taskDeleted, (state, { payload }) =>
    state.filter(({ uuid }) => uuid !== payload),
  );
});

export const taskReducer = combineReducers({
  taskValue,
});

export const selectTasks = (state: AppState) => state.tasks.taskValue;

export const selectTasksByDate = (date: string) => (state: AppState) =>
  selectTasks(state).filter((task) => matches(task, date));
