import { Task } from '../types/task.ts';
import {
  getCurrentMonthDate,
  getCurrentMonthSameWeekdays,
  getDate,
  getDay,
  getMonthLength,
  getStartOfDateInUTC,
  isCurrentMonth,
  startingFrom,
} from '../utils/time.ts';
import {
  selectIterationsByTask,
  selectTasks,
  selectTasksByDate,
} from './selectors.ts';
import {
  daySelected,
  taskAdded,
  taskDeleted,
  taskEdited,
  tasksInit,
} from './actions.ts';
import type {
  AppDispatch,
  AppState,
  AppThunk,
  IterationState,
  ScheduleState,
  TaskState,
} from './types.ts';
import { TaskRepetition } from '../types/task-repetition.ts';
import { TaskIteration } from '../types/task-iteration.ts';

const tasksLocalStorageKey = 'tasks';

const setLocalStorage = (tasks: TaskState) =>
  localStorage.setItem(tasksLocalStorageKey, JSON.stringify(tasks));

export const initTasks = (): AppThunk => {
  return (dispatch, getState) => {
    const storedTasks = localStorage.getItem(tasksLocalStorageKey);
    let parsedTasks = {};

    if (storedTasks) {
      try {
        parsedTasks = JSON.parse(storedTasks);
      } catch (e) {
        console.error(e);
      }
    }

    dispatch(
      tasksInit({
        tasks: parsedTasks,
        ...constructSchedule(getState),
      }),
    );
    setLocalStorage(parsedTasks); // reset local storage in case of errors
  };
};

export const addTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    const payload = {
      ...task,
      uuid: crypto.randomUUID(),
      date: getStartOfDateInUTC(task.date).toString(),
    };

    dispatch(
      taskAdded({
        task: payload,
        iterations: constructCurrentMonthTaskIterations(payload),
      }),
    );

    selectDayIfCurrentMonth(payload.date, dispatch);
    setLocalStorage(selectTasks(getState()));
  };
};

export const editTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    const payload = {
      ...task,
      date: getStartOfDateInUTC(task.date).toString(),
    };

    dispatch(
      taskEdited({
        task: payload,
        iterations: constructCurrentMonthTaskIterations(payload),
        obsoleteIterations: selectIterationsByTask(payload.uuid)(getState()),
      }),
    );

    selectDayIfCurrentMonth(payload.date, dispatch);
    setLocalStorage(selectTasks(getState()));
  };
};

export const deleteTask = (uuid: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(
      taskDeleted({
        taskUuid: uuid,
        iterationsUuids: selectIterationsByTask(uuid)(getState()),
      }),
    );

    setLocalStorage(selectTasks(getState()));
  };
};

const constructCurrentMonthTaskIterations = (task: Task): TaskIteration[] => {
  switch (task.repetition) {
    case TaskRepetition.ONCE:
      if (isCurrentMonth(getDate(task.date))) {
        return [constructTaskIteration(task, task.date)];
      }

      break;

    case TaskRepetition.EVERY_MONTH: {
      const date = getCurrentMonthDate(getDay(task.date))?.toString();

      if (date && startingFrom(task.date, date)) {
        return [constructTaskIteration(task, date)];
      }

      break;
    }

    case TaskRepetition.EVERY_WEEK:
      return getCurrentMonthSameWeekdays(task.date)
        .filter((date) => startingFrom(task.date, date.toString()))
        .map((date) => constructTaskIteration(task, date.toString()));
  }

  return [];
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

const constructTaskIterationsForDay = (
  day: number,
  getState: () => AppState,
): TaskIteration[] | undefined => {
  const date = getCurrentMonthDate(day)?.toString();

  if (date) {
    return selectTasksByDate(date)(getState())?.map((task) =>
      constructTaskIteration(task, date),
    );
  }
};

// todo learn to store the iterations in the localStorage, so you can recover their metadata (the task was checked yesterday)
//  + fill them with missing records of not checked iterations
// for now, they are recreated every time
const constructSchedule = (getState: () => AppState) => {
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

  return { schedule, iterations };
};

const selectDayIfCurrentMonth = (date: string, dispatch: AppDispatch) => {
  if (isCurrentMonth(getDate(date))) {
    dispatch(daySelected(getDay(date)));
  }
};
