import { AppDispatch, AppState, AppThunk } from './app.store.ts';
import {
  getCurrentMonthDate,
  getCurrentMonthSameWeekdays,
  getDate,
  getDay,
  getMonthLength,
  isCurrentMonth,
} from '../utils/time.ts';
import { scheduleAdd, scheduleInit, ScheduleState } from './schedule.store.ts';
import { selectTasks } from './selectors.ts';
import { TaskIteration } from '../types/task-iteration.ts';
import {
  iterationAdd,
  iterationsInit,
  IterationState,
} from './iteration.store.ts';
import { matches, Task } from '../types/task.ts';
import { TaskRepetition } from '../types/task-repetition.ts';

// Schedule + Iterations

// todo learn to store the iterations in the localStorage, so you can recover their metadata (the task was checked yesterday)
//  + fill them with missing records of not checked iterations
// for now, they are recreated every time
export const initScheduleAndInteractions = (): AppThunk => {
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

    dispatch(scheduleInit(schedule));
    dispatch(iterationsInit(iterations));
  };
};

export const addScheduleAndInteraction = (task: Task): AppThunk => {
  return (dispatch) => {
    switch (task.repetition) {
      case TaskRepetition.ONCE:
        if (isCurrentMonth(getDate(task.date))) {
          dispatchConstructedIteration(task, task.date, dispatch);
        }
        break;

      case TaskRepetition.EVERY_WEEK:
        getCurrentMonthSameWeekdays(task.date).forEach((date) =>
          dispatchConstructedIteration(task, date.toString(), dispatch),
        );
        break;

      case TaskRepetition.EVERY_MONTH: {
        const day = getCurrentMonthDate(getDay(task.date));

        if (day) {
          dispatchConstructedIteration(task, day.toString(), dispatch);
        }
        break;
      }
    }
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

const dispatchConstructedIteration = (
  task: Task,
  completionDate: string,
  dispatch: AppDispatch,
) => {
  const iteration = constructTaskIteration(task, completionDate);
  dispatch(iterationAdd(iteration));

  dispatch(
    scheduleAdd({
      day: getDay(completionDate).toString(),
      iterationUuid: iteration.uuid,
    }),
  );
};
