import {
  equalDates,
  equalDaysOfMonth,
  equalDaysOfWeek,
} from '../utils/time.ts';

export interface Task {
  uuid: string;
  name: string;
  date: string;
  repetition: TaskRepetition;
}

export enum TaskRepetition {
  ONCE = 'ONCE',
  EVERY_WEEK = 'EVERY_WEEK',
  EVERY_MONTH = 'EVERY_MONTH',
}

const taskRepetitionLabels: { [key in TaskRepetition]: string } = {
  [TaskRepetition.ONCE]: 'Once',
  [TaskRepetition.EVERY_WEEK]: 'Every Week',
  [TaskRepetition.EVERY_MONTH]: 'Every Month',
};

export const taskRepetitionOptions = (
  Object.keys(TaskRepetition) as TaskRepetition[]
).map((key) => ({
  label: taskRepetitionLabels[key],
  value: key,
}));

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
