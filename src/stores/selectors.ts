import { TaskIteration } from '../types/task-iteration.ts';
import { Task } from '../types/task.ts';
import type { AppState } from './types.ts';
import { TaskRepetition } from '../types/task-repetition.ts';
import {
  equalDates,
  equalDaysOfMonth,
  equalDaysOfWeek,
  startingFrom,
} from '../utils/time.ts';

export const selectDay = (state: AppState) => state.day.dayValue;
export const selectTasks = (state: AppState) => state.tasks.taskValue;

export const selectTask =
  (uuid: string) =>
  (state: AppState): Task | undefined =>
    selectTasks(state)[uuid];

export const selectTasksByDate =
  (date: string) =>
  (state: AppState): Task[] | undefined =>
    Object.values(selectTasks(state)).filter((task: Task) =>
      matches(task, date),
    );

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
  (state: AppState): string[] =>
    Object.values(selectIterations(state))
      .filter((iteration) => iteration.task.uuid === taskUuid)
      .map(({ uuid }) => uuid);

export const selectIterationsByDay =
  (day: number) =>
  (state: AppState): TaskIteration[] | undefined =>
    selectScheduleDay(day)(state)
      ?.map((iterationUuid) => selectIterationByUuid(iterationUuid)(state))
      .filter((iteration): iteration is TaskIteration => Boolean(iteration));

const matches = (task: Task, date: string) => {
  switch (task.repetition) {
    case TaskRepetition.ONCE:
      return equalDates(task.date, date);
    case TaskRepetition.EVERY_MONTH:
      return equalDaysOfMonth(task.date, date) && startingFrom(task.date, date);
    case TaskRepetition.EVERY_WEEK:
      return equalDaysOfWeek(task.date, date) && startingFrom(task.date, date);
  }
};
