export enum TaskRepetition {
  ONCE = 'ONCE',
  EVERY_WEEK = 'EVERY_WEEK',
  EVERY_MONTH = 'EVERY_MONTH',
}

export const taskRepetitionLabels: { [key in TaskRepetition]: string } = {
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

export const getRepetitionIcon = (repetition: TaskRepetition): string => {
  switch (repetition) {
    case TaskRepetition.ONCE:
      return '1x_mobiledata';
    case TaskRepetition.EVERY_MONTH:
    case TaskRepetition.EVERY_WEEK:
      return 'loop';
  }
};
