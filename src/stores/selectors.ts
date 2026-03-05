import { AppState } from './app.store.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import { Task } from '../types/task.ts';

export const selectDay = (state: AppState) => state.day.dayValue;
export const selectTasks = (state: AppState) => state.tasks.taskValue;

export const selectTask =
  (uuid: string) =>
  (state: AppState): Task | undefined =>
    selectTasks(state)[uuid];

export const selectSchedule = (state: AppState) => state.schedule.scheduleValue;

export const selectScheduleDay =
  (day: number) =>
  (state: AppState): string[] | undefined =>
    selectSchedule(state)[day];

export const selectIterations = (state: AppState) =>
  state.schedule.iterationsValue;

export const selectIterationByUuid =
  (uuid: string) =>
  (state: AppState): TaskIteration | undefined =>
    selectIterations(state)[uuid];

export const selectIterationsByTask =
  (taskUuid: string) =>
  (state: AppState): TaskIteration[] =>
    Object.values(selectIterations(state)).filter(
      (iteration) => iteration.task.uuid === taskUuid,
    );

export const selectIterationsByDay =
  (day: number) =>
  (state: AppState): TaskIteration[] | undefined =>
    selectScheduleDay(day)(state)
      ?.map((iterationUuid) => selectIterationByUuid(iterationUuid)(state))
      .filter((iteration): iteration is TaskIteration => Boolean(iteration));
