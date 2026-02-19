import { Task } from './task.ts';

export interface TaskIteration {
  uuid: string;
  completionDate: string;
  checked: boolean;
  task: Task;
}
