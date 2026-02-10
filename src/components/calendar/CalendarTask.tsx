import { Badge, Tooltip } from '@mantine/core';
import { Task, TaskRepetition } from '../../types/task.ts';
import classes from './Calendar.module.scss';

interface CalendarTaskProps {
  task: Task;
}

const getIcon = (repetition: TaskRepetition): string => {
  switch (repetition) {
    case TaskRepetition.ONCE:
      return '1x_mobiledata';
    case TaskRepetition.EVERY_MONTH:
    case TaskRepetition.EVERY_WEEK:
      return 'loop';
  }
};

export function CalendarTask({ task }: CalendarTaskProps) {
  const icon = (
    <span className="material-icons">{getIcon(task.repetition)}</span>
  );

  return (
    <Tooltip position="bottom" label={task.name}>
      <Badge
        className={classes.taskCard}
        variant="light"
        radius="sm"
        size="sm"
        rightSection={icon}>
        {task.name}
      </Badge>
    </Tooltip>
  );
}
