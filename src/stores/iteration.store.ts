import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { iterationAdd, iterationsDelete, iterationsInit } from './actions.ts';
import { IterationState } from './types.ts';

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
