import { createAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import { IterationState, ScheduleState, TaskState } from './types.ts';

export const daySelected = createAction<number>('daySelected');

export const tasksInit = createAction<{
  tasks: TaskState;
  schedule: ScheduleState;
  iterations: IterationState;
}>('tasksInit');

export const taskAdded = createAction<{
  task: Task; // new task
  iterations: TaskIteration[]; // new iterations
}>('taskAdded');

export const taskEdited = createAction<{
  task: Task; // updated task
  iterations: TaskIteration[]; // new iterations
  obsoleteIterations: string[]; // previously related iterations which should be removed
}>('taskEdited');

export const taskToggled = createAction<string>('taskToggled');

export const taskDeleted = createAction<{
  taskUuid: string; // removed task uuid
  iterationsUuids: string[]; // related iterations uuids
}>('taskDeleted');
