import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { scheduleAdd, scheduleDelete, scheduleInit } from './actions.ts';
import { ScheduleState } from './types.ts';

export const scheduleValue = createReducer<ScheduleState>({}, (builder) => {
  builder.addCase(scheduleInit, (_state, { payload }) => ({ ...payload }));

  builder.addCase(scheduleAdd, (state, { payload }) => ({
    ...state,
    [payload.day]: [...state[payload.day], payload.iterationUuid],
  }));

  builder.addCase(scheduleDelete, (state, { payload }) => {
    return Object.entries(state).reduce(
      (acc, [day, uuids]) => ({
        ...acc,
        [day]: uuids.filter((uuid) => !payload.includes(uuid)),
      }),
      {},
    );
  });
});

export const scheduleReducer = combineReducers({
  scheduleValue,
});
