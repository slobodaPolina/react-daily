import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { taskAdded, taskDeleted, taskEdited, tasksInit } from './actions.ts';
import type { TaskState } from './types.ts';

export const taskValue = createReducer<TaskState>({}, (builder) => {
  builder.addCase(tasksInit, (_state, { payload }) => ({ ...payload.tasks }));

  builder.addCase(taskAdded, (state, { payload }) => ({
    ...state,
    [payload.task.uuid]: payload.task,
  }));

  builder.addCase(taskEdited, (state, { payload }) => ({
    ...state,
    [payload.task.uuid]: payload.task,
  }));

  builder.addCase(taskDeleted, (state, { payload }) => {
    const { [payload.taskUuid]: _, ...updated } = state;
    return updated;
  });
});

export const taskReducer = combineReducers({
  taskValue,
});
