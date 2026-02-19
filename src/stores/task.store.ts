import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';

export type TaskState = { [key: string]: Task };

export const tasksInit = createAction<TaskState>('tasksInit');
export const taskAdded = createAction<Task>('taskAdded');
export const taskEdited = createAction<Task>('taskEdited');
export const taskDeleted = createAction<string>('taskDeleted');

export const taskValue = createReducer<TaskState>({}, (builder) => {
  builder.addCase(tasksInit, (_state, { payload }) => ({ ...payload }));
  builder.addCase(taskAdded, (state, { payload }) => ({
    ...state,
    [payload.uuid]: payload,
  }));

  builder.addCase(taskEdited, (state, { payload }) => ({
    ...state,
    [payload.uuid]: payload,
  }));

  builder.addCase(taskDeleted, (state, { payload }) => {
    const { [payload]: _, ...updated } = state;
    return updated;
  });
});

export const taskReducer = combineReducers({
  taskValue,
});
