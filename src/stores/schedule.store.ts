import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  taskAdded,
  taskDeleted,
  taskEdited,
  tasksInit,
  taskToggled,
} from './actions.ts';
import type { IterationState, ScheduleState } from './types.ts';
import { getDay } from '../utils/time.ts';
import { TaskIteration } from '../types/task-iteration.ts';

export const scheduleValue = createReducer<ScheduleState>({}, (builder) => {
  const addSchedule = (
    iterations: TaskIteration[],
    state: ScheduleState,
  ): ScheduleState =>
    iterations.reduce((acc, current) => {
      const day = getDay(current.completionDate).toString();

      return {
        ...acc,
        [day]: [...acc[day], current.uuid],
      };
    }, state);

  const deleteSchedule = (
    iterationUuids: string[],
    state: ScheduleState,
  ): ScheduleState =>
    Object.entries(state).reduce(
      (acc, [day, uuids]) => ({
        ...acc,
        [day]: uuids.filter((uuid) => !iterationUuids.includes(uuid)),
      }),
      {},
    );

  builder.addCase(tasksInit, (_state, { payload }) => ({
    ...payload.schedule,
  }));

  builder.addCase(taskAdded, (state, { payload }) =>
    addSchedule(payload.iterations, state),
  );

  builder.addCase(taskEdited, (state, { payload }) =>
    addSchedule(
      payload.iterations,
      deleteSchedule(payload.obsoleteIterations, state),
    ),
  );

  builder.addCase(taskDeleted, (state, { payload }) =>
    deleteSchedule(payload.iterationsUuids, state),
  );
});

export const iterationsValue = createReducer<IterationState>({}, (builder) => {
  const addIterations = (iterations: TaskIteration[], state: IterationState) =>
    iterations.reduce(
      (acc, current) => ({
        ...acc,
        [current.uuid]: current,
      }),
      state,
    );

  const deleteIterations = (iterationsUuids: string[], state: IterationState) =>
    Object.values(state).reduce(
      (acc, current) =>
        iterationsUuids.includes(current.uuid)
          ? acc
          : { ...acc, [current.uuid]: current },
      {},
    );

  builder.addCase(tasksInit, (_state, { payload }) => ({
    ...payload.iterations,
  }));

  builder.addCase(taskAdded, (state, { payload }) =>
    addIterations(payload.iterations, state),
  );

  builder.addCase(taskEdited, (state, { payload }) =>
    addIterations(
      payload.iterations,
      deleteIterations(payload.obsoleteIterations, state),
    ),
  );

  builder.addCase(taskDeleted, (state, { payload }) =>
    deleteIterations(payload.iterationsUuids, state),
  );

  builder.addCase(taskToggled, (state, { payload }) => ({
    ...state,
    [payload]: {
      ...state[payload],
      checked: !state[payload].checked,
    },
  }));
});

export const scheduleReducer = combineReducers({
  scheduleValue,
  iterationsValue,
});
