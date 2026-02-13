import { Task } from '../types/task.ts';
import {
  selectTasks,
  taskAdded,
  taskDeleted,
  taskEdited,
  tasksInit,
} from './task.store.ts';
import { AppThunk } from './app.store.ts';
import { getStartOfDateInUTC } from '../utils/time.ts';

const tasksLocalStorageKey = 'tasks';

const setLocalStorage = (tasks: Task[]) =>
  localStorage.setItem(tasksLocalStorageKey, JSON.stringify(tasks));

export const initTasks = (): AppThunk => {
  return (dispatch) => {
    const storedTasks = localStorage.getItem(tasksLocalStorageKey);
    let parsedTasks = [];

    if (storedTasks) {
      try {
        parsedTasks = JSON.parse(storedTasks);
      } catch (e) {
        console.error(e);
        parsedTasks = [];
      }
    }

    dispatch(tasksInit(parsedTasks));
    setLocalStorage(parsedTasks); // reset local storage in case of errors
  };
};

export const addTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(
      taskAdded({
        ...task,
        uuid: crypto.randomUUID(),
        date: getStartOfDateInUTC(task.date).toString(),
      }),
    );

    setLocalStorage(selectTasks(getState()));
  };
};

export const editTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(
      taskEdited({
        ...task,
        date: getStartOfDateInUTC(task.date).toString(),
      }),
    );

    setLocalStorage(selectTasks(getState()));
  };
};

export const deleteTask = (uuid: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(taskDeleted(uuid));

    setLocalStorage(selectTasks(getState()));
  };
};
