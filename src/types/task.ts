import {
  equalDates,
  equalDaysOfMonth,
  equalDaysOfWeek,
} from '../utils/time.ts';
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

export const matches = (task: Task, date: string) => {
  switch (task.repetition) {
    case TaskRepetition.ONCE:
      return equalDates(task.date, date);
    case TaskRepetition.EVERY_MONTH:
      return equalDaysOfMonth(task.date, date);
    case TaskRepetition.EVERY_WEEK:
      return equalDaysOfWeek(task.date, date);
  }
};
