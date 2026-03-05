import { AppState, AppThunk } from './app.store.ts';
import {
  equalDates,
  equalDaysOfMonth,
  equalDaysOfWeek,
  getCurrentMonthDate,
  getCurrentMonthSameWeekdays,
  getDate,
  getDay,
  getMonthLength,
  isCurrentMonth,
  startingFrom,
} from '../utils/time.ts';
import { selectIterationsByTask, selectTasks } from './selectors.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import { Task } from '../types/task.ts';
import { TaskRepetition } from '../types/task-repetition.ts';
import { scheduleAdd, scheduleDelete, scheduleInit } from './actions.ts';
import { IterationState, ScheduleState } from './types.ts';

// todo learn to store the iterations in the localStorage, so you can recover their metadata (the task was checked yesterday)
//  + fill them with missing records of not checked iterations
// for now, they are recreated every time
export const initSchedule = (): AppThunk => {
  return (dispatch, getState) => {
    const schedule: ScheduleState = {};
    let iterations: IterationState = {};

    for (let day = 1; day <= getMonthLength(); day++) {
      const dayIterations = constructTaskIterationsForDay(day, getState) ?? [];
      schedule[day] = dayIterations?.map(({ uuid }) => uuid);

      iterations = dayIterations.reduce(
        (acc, iteration) => ({
          ...acc,
          [iteration.uuid]: iteration,
        }),
        iterations,
      );
    }

    dispatch(scheduleInit({ schedule, iterations }));
  };
};

export const addSchedule = (task: Task): AppThunk => {
  return (dispatch) => {
    switch (task.repetition) {
      case TaskRepetition.ONCE:
        if (isCurrentMonth(getDate(task.date))) {
          dispatch(scheduleAdd(constructTaskIteration(task, task.date)));
        }
        break;

      case TaskRepetition.EVERY_WEEK:
        getCurrentMonthSameWeekdays(task.date)
          .filter((date) => startingFrom(task.date, date.toString()))
          .forEach((date) =>
            dispatch(
              scheduleAdd(constructTaskIteration(task, date.toString())),
            ),
          );
        break;

      case TaskRepetition.EVERY_MONTH: {
        const date = getCurrentMonthDate(getDay(task.date))?.toString();

        if (date && startingFrom(task.date, date)) {
          dispatch(scheduleAdd(constructTaskIteration(task, date)));
        }
        break;
      }
    }
  };
};

export const deleteSchedule = (taskUuid: string): AppThunk => {
  return (dispatch, getState) => {
    const iterationUuids = selectIterationsByTask(taskUuid)(getState()).map(
      ({ uuid }) => uuid,
    );

    dispatch(scheduleDelete(iterationUuids));
  };
};

const constructTaskIteration = (
  task: Task,
  completionDate: string,
): TaskIteration => ({
  uuid: crypto.randomUUID(),
  checked: false,
  completionDate,
  task,
});

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

const selectTasksByDate = (date: string, state: AppState): Task[] | undefined =>
  Object.values(selectTasks(state)).filter((task: Task) => matches(task, date));

const constructTaskIterationsForDay = (
  day: number,
  getState: () => AppState,
): TaskIteration[] | undefined => {
  const date = getCurrentMonthDate(day)?.toString();

  if (date) {
    return selectTasksByDate(date, getState())?.map((task) =>
      constructTaskIteration(task, date),
    );
  }
};
