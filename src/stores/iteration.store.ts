import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { TaskIteration } from '../types/task-iteration.ts';

// Iterations for the selected month (current month for now)

// [iterationUuid]: iteration
export type IterationState = { [key: string]: TaskIteration };

export const iterationsInit = createAction<IterationState>('iterationsInit');
export const iterationAdd = createAction<TaskIteration>('iterationAdd');

export const iterationValue = createReducer<IterationState>({}, (builder) => {
  builder.addCase(iterationsInit, (_state, { payload }) => ({ ...payload }));

  builder.addCase(iterationAdd, (state, { payload }) => ({
    ...state,
    [payload.uuid]: payload,
  }));
});

export const iterationReducer = combineReducers({
  iterationValue,
});
