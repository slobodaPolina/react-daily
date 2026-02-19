import { Task } from '../types/task.ts';
import { taskAdded, taskDeleted, taskEdited, tasksInit } from './task.store.ts';
import { AppThunk } from './app.store.ts';
import { getStartOfDateInUTC } from '../utils/time.ts';
import { TaskState } from './task.store.ts';
import { selectTasks } from './selectors.ts';
import {
  addScheduleAndInteraction,
  deleteScheduleAndInteraction,
  initScheduleAndInteractions,
} from './schedule.thunk.ts';

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
    dispatch(initScheduleAndInteractions());
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
    dispatch(addScheduleAndInteraction(payload));
    setLocalStorage(selectTasks(getState()));
  };
};

// todo sync with the iterations and schedule:
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
    dispatch(deleteScheduleAndInteraction(uuid));
    setLocalStorage(selectTasks(getState()));
  };
};
