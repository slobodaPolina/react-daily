import { createAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import { IterationState, ScheduleState, TaskState } from './types.ts';

export const daySelected = createAction<number>('daySelected');

export const tasksInit = createAction<TaskState>('tasksInit');
export const taskAdded = createAction<Task>('taskAdded');
export const taskEdited = createAction<Task>('taskEdited');
export const taskDeleted = createAction<string>('taskDeleted');

// todo remove?
export const iterationsInit = createAction<IterationState>('iterationsInit');
export const iterationAdd = createAction<TaskIteration>('iterationAdd');
export const iterationsDelete = createAction<string[]>('iterationsDelete');

export const scheduleInit = createAction<ScheduleState>('scheduleInit');
export const scheduleAdd = createAction<{ day: string; iterationUuid: string }>(
  'scheduleAdd',
);
export const scheduleDelete = createAction<string[]>('scheduleDelete');
