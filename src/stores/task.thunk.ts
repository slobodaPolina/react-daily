import { Task } from '../types/task.ts';
import {
  getDate,
  getDay,
  getStartOfDateInUTC,
  isCurrentMonth,
} from '../utils/time.ts';
import { selectTasks } from './selectors.ts';
import { addSchedule, deleteSchedule, initSchedule } from './schedule.thunk.ts';
import {
  daySelected,
  taskAdded,
  taskDeleted,
  taskEdited,
  tasksInit,
} from './actions.ts';
import type { AppThunk, TaskState } from './types.ts';

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
    dispatch(initSchedule());
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
    dispatch(addSchedule(payload));

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
    dispatch(deleteSchedule(payload.uuid));
    dispatch(addSchedule(payload));
    setLocalStorage(selectTasks(getState()));
  };
};

export const deleteTask = (uuid: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(taskDeleted(uuid));
    dispatch(deleteSchedule(uuid));
    setLocalStorage(selectTasks(getState()));
  };
};
