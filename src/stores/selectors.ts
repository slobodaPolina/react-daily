import { AppState } from './app.store.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import { Task } from '../types/task.ts';

export const selectDay = (state: AppState) => state.day.dayValue;
export const selectTasks = (state: AppState) => state.tasks.taskValue;

export const selectTask =
  (uuid: string) =>
  (state: AppState): Task | undefined =>
    selectTasks(state)[uuid];

export const selectIterations = (state: AppState) =>
  state.iterations.iterationValue;

export const selectIteration =
  (uuid: string) =>
  (state: AppState): TaskIteration | undefined =>
    selectIterations(state)[uuid];

export const selectSchedule = (state: AppState) => state.schedule.scheduleValue;

export const selectScheduleDay =
  (day: number) =>
  (state: AppState): string[] | undefined =>
    selectSchedule(state)[day];

export const selectTasksIterationsByDay =
  (day: number) =>
  (state: AppState): TaskIteration[] | undefined =>
    selectScheduleDay(day)(state)
      ?.map((iterationUuid) => selectIteration(iterationUuid)(state))
      .filter((iteration): iteration is TaskIteration => Boolean(iteration));
