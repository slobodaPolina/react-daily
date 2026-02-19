import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';

// Schedule for the selected month (current month for now)

// [day number (1-31)]: iterationUuids[], like { '27': ['b121d549-ae1f-4ea9-bfa4-fcc796520ded'] }
export type ScheduleState = { [key: string]: string[] };
type ScheduleAddPayload = { day: string; iterationUuid: string };

export const scheduleInit = createAction<ScheduleState>('scheduleInit');
export const scheduleAdd = createAction<ScheduleAddPayload>('scheduleAdd');
export const scheduleDelete = createAction<string[]>('scheduleDelete');

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
