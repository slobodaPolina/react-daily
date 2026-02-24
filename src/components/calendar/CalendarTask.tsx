import { Badge, Tooltip } from '@mantine/core';
import classes from './Calendar.module.scss';
import { getRepetitionIcon } from '../../types/task-repetition.ts';
import { TaskIteration } from '../../types/task-iteration.ts';

interface CalendarTaskProps {
  iteration: TaskIteration;
}

export function CalendarTask({ iteration }: CalendarTaskProps) {
  const task = iteration.task;

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
