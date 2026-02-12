import { Task } from '../types/task.ts';
import { selectTasks, taskAdded, tasksInit } from './task.store.ts';
import { AppThunk } from './app.store.ts';
import { getStartOfDateInUTC } from '../utils/time.ts';

const tasksLocalStorageKey = 'tasks';

export const initTasks = (): AppThunk => {
  return (dispatch) => {
    dispatch(
      tasksInit(JSON.parse(localStorage.getItem(tasksLocalStorageKey) ?? '[]')),
    );
  };
};

export const addTask = (task: Task): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(
      taskAdded({
        ...task,
        date: getStartOfDateInUTC(task.date).toString(),
      }),
    );

    localStorage.setItem(
      tasksLocalStorageKey,
      JSON.stringify(selectTasks(getState())),
    );
  };
};
