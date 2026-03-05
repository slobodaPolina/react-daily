import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { taskAdded, taskDeleted, taskEdited, tasksInit } from './actions.ts';
import type { TaskState } from './types.ts';

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
