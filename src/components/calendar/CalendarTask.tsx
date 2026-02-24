import { Badge, Tooltip } from '@mantine/core';
import classes from './Calendar.module.scss';
import { getRepetitionIcon } from '../../types/task-repetition.ts';
import { getCheckedIcon, TaskIteration } from '../../types/task-iteration.ts';

interface CalendarTaskProps {
  iteration: TaskIteration;
}

export function CalendarTask({ iteration }: CalendarTaskProps) {
  const task = iteration.task;

  const checkedIcon = (
    <span className="material-icons">{getCheckedIcon(iteration.checked)}</span>
  );

  const repetitionIcon = (
    <span className="material-icons">{getRepetitionIcon(task.repetition)}</span>
  );

  return (
    <Tooltip position="bottom" label={task.name}>
      <Badge
        leftSection={checkedIcon}
        className={classes.taskCard}
        variant="light"
        radius="sm"
        size="sm"
        rightSection={repetitionIcon}>
        {task.name}
      </Badge>
    </Tooltip>
  );
}
