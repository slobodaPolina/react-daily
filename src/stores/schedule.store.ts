import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  scheduleAdd,
  scheduleCheckToggled,
  scheduleDelete,
  scheduleInit,
} from './actions.ts';
import { IterationState, ScheduleState } from './types.ts';
import { getDay } from '../utils/time.ts';

export const scheduleValue = createReducer<ScheduleState>({}, (builder) => {
  builder.addCase(scheduleInit, (_state, { payload }) => ({
    ...payload.schedule,
  }));

  builder.addCase(scheduleAdd, (state, { payload }) => {
    const day = getDay(payload.completionDate).toString();

    return {
      ...state,
      [day]: [...state[day], payload.uuid],
    };
  });

  builder.addCase(scheduleDelete, (state, { payload }) =>
    Object.entries(state).reduce(
      (acc, [day, uuids]) => ({
        ...acc,
        [day]: uuids.filter((uuid) => !payload.includes(uuid)),
      }),
      {},
    ),
  );
});

export const iterationsValue = createReducer<IterationState>({}, (builder) => {
  builder.addCase(scheduleInit, (_state, { payload }) => ({
    ...payload.iterations,
  }));

  builder.addCase(scheduleAdd, (state, { payload }) => ({
    ...state,
    [payload.uuid]: payload,
  }));

  builder.addCase(scheduleCheckToggled, (state, { payload }) => ({
    ...state,
    [payload]: {
      ...state[payload],
      checked: !state[payload].checked,
    },
  }));

  builder.addCase(scheduleDelete, (state, { payload }) =>
    Object.values(state).reduce(
      (acc, current) =>
        payload.includes(current.uuid)
          ? acc
          : { ...acc, [current.uuid]: current },
      {},
    ),
  );
});

export const scheduleReducer = combineReducers({
  scheduleValue,
  iterationsValue,
});
