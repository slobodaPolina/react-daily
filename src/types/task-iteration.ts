import { Task } from './task.ts';

export interface TaskIteration {
  uuid: string;
  completionDate: string;
  checked: boolean;
  task: Task;
}

export const getCheckedIcon = (checked: boolean): string => {
  return checked ? 'check' : 'check_box_outline_blank';
};
