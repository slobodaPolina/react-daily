import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';
import { equalDates, getStartOfDateInUTC } from '../utils/time.ts';
import { AppState } from './app.store.ts';

export const initTasks = createAction('initTasks');
export const addTask = createAction<Task>('addTask');

const tasksLocalStorageKey = 'tasks';

export const taskValue = createReducer<Task[]>([], (builder) => {
  builder.addCase(initTasks, () => {
    return JSON.parse(localStorage.getItem(tasksLocalStorageKey) ?? '[]');
  });

  builder.addCase(addTask, (state, { payload }) => {
    const task: Task = {
      ...payload,
      date: getStartOfDateInUTC(payload.date),
    };

    const tasks = [...state, task];
    localStorage.setItem(tasksLocalStorageKey, JSON.stringify(tasks));

    return tasks;
  });
});

export const taskReducer = combineReducers({
  taskValue,
});

export const selectTasksByDay = (day: Date) => (state: AppState) =>
  state.tasks.taskValue.filter(({ date }) => equalDates(date, day)); // todo or 'once in a month' - same day of another month?
