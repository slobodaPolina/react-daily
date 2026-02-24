import { TaskRepetition } from './task-repetition.ts';

export interface Task {
  uuid: string;
  name: string;
  date: string;
  repetition: TaskRepetition;
}

export const taskInitialValue: Task = {
  uuid: '',
  name: '',
  date: new Date().toString(),
  repetition: TaskRepetition.ONCE,
};
