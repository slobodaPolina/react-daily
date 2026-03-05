import { createAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import type { CombinedScheduleState, TaskState } from './types.ts';

export const daySelected = createAction<number>('daySelected');

export const tasksInit = createAction<TaskState>('tasksInit');
export const taskAdded = createAction<Task>('taskAdded');
export const taskEdited = createAction<Task>('taskEdited');
export const taskDeleted = createAction<string>('taskDeleted');

export const scheduleInit = createAction<CombinedScheduleState>('scheduleInit');
export const scheduleAdd = createAction<TaskIteration>('scheduleAdd');

export const scheduleCheckToggled = createAction<string>(
  'scheduleCheckToggled',
);

export const scheduleDelete = createAction<string[]>('scheduleDelete');
