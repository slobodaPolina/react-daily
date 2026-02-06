import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './task.store.ts';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
