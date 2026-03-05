import { Task } from '../types/task.ts';
import { AppThunk } from './app.store.ts';
import {
  getDate,
  getDay,
  getStartOfDateInUTC,
  isCurrentMonth,
} from '../utils/time.ts';
import { selectTasks } from './selectors.ts';
import {
  addScheduleAndIteration,
  deleteScheduleAndIteration,
  initScheduleAndIterations,
} from './schedule.thunk.ts';
import {
  daySelected,
  taskAdded,
  taskDeleted,
  taskEdited,
  tasksInit,
} from './actions.ts';
import { TaskState } from './types.ts';

const tasksLocalStorageKey = 'tasks';

const setLocalStorage = (tasks: TaskState) =>
  localStorage.setItem(tasksLocalStorageKey, JSON.stringify(tasks));

export const initTasks = (): AppThunk => {
  return (dispatch) => {
    const storedTasks = localStorage.getItem(tasksLocalStorageKey);
    let parsedTasks = {};

    if (storedTasks) {
      try {
        parsedTasks = JSON.parse(storedTasks);
      } catch (e) {
        console.error(e);
      }
    }

    dispatch(tasksInit(parsedTasks));
    dispatch(initScheduleAndIterations());
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

    dispatch(taskAdded(payload));
    dispatch(addScheduleAndIteration(payload));

    if (isCurrentMonth(getDate(payload.date))) {
      dispatch(daySelected(getDay(payload.date)));
    }

    setLocalStorage(selectTasks(getState()));
  };
};

export const editTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    const payload = {
      ...task,
      date: getStartOfDateInUTC(task.date).toString(),
    };

    dispatch(taskEdited(payload));
    dispatch(deleteScheduleAndIteration(payload.uuid));
    dispatch(addScheduleAndIteration(payload));
    setLocalStorage(selectTasks(getState()));
  };
};

export const deleteTask = (uuid: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(taskDeleted(uuid));
    dispatch(deleteScheduleAndIteration(uuid));
    setLocalStorage(selectTasks(getState()));
  };
};
