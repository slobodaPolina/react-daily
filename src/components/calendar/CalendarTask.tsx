import { Badge, Tooltip } from '@mantine/core';
import { Task } from '../../types/task.ts';
import classes from './Calendar.module.scss';
import { getRepetitionIcon } from '../../types/TaskRepetition.ts';

interface CalendarTaskProps {
  task: Task;
}

export function CalendarTask({ task }: CalendarTaskProps) {
  const icon = (
    <span className="material-icons">{getRepetitionIcon(task.repetition)}</span>
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
