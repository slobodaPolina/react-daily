export interface Task {
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
  name: '',
  date: new Date().toString(),
  repetition: TaskRepetition.ONCE,
};
