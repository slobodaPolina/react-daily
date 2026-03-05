import { TaskIteration } from '../types/task-iteration.ts';
import { Task } from '../types/task.ts';

// Schedule for the selected month (current month for now)
export type CombinedScheduleState = {
  schedule: ScheduleState;
  iterations: IterationState;
};

// [day number (1-31)]: iterationUuids[], like { '27': ['b121d549-ae1f-4ea9-bfa4-fcc796520ded'] }
export type ScheduleState = { [key: string]: string[] };

// [iterationUuid]: iteration
export type IterationState = { [key: string]: TaskIteration };

// All tasks in the system
// [taskUuid]: task
export type TaskState = { [key: string]: Task };
