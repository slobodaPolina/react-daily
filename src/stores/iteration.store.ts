import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { TaskIteration } from '../types/task-iteration.ts';

// Iterations for the selected month (current month for now)

// [iterationUuid]: iteration
export type IterationState = { [key: string]: TaskIteration };

export const iterationsInit = createAction<IterationState>('iterationsInit');
export const iterationAdd = createAction<TaskIteration>('iterationAdd');
export const iterationsDelete = createAction<string[]>('iterationsDelete');

export const iterationValue = createReducer<IterationState>({}, (builder) => {
  builder.addCase(iterationsInit, (_state, { payload }) => ({ ...payload }));

  builder.addCase(iterationAdd, (state, { payload }) => ({
    ...state,
    [payload.uuid]: payload,
  }));

  builder.addCase(iterationsDelete, (state, { payload }) => {
    return Object.values(state).reduce(
      (acc, current) =>
        payload.includes(current.uuid)
          ? acc
          : { ...acc, [current.uuid]: current },
      {},
    );
  });
});

export const iterationReducer = combineReducers({
  iterationValue,
});
