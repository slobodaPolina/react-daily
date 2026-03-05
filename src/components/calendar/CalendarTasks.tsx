import { Badge } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarTask } from './CalendarTask.tsx';
import classes from './Calendar.module.scss';
import { selectIterationsByDay } from '../../stores/selectors.ts';
import { daySelected } from '../../stores/actions.ts';
import type { AppDispatch } from '../../stores/types.ts';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const tasksIterations = useSelector(selectIterationsByDay(day));
  const onClick = () => dispatch(daySelected(day));

  return (
    <div className={classes.contentWrapper} onClick={onClick}>
      <Badge color="deepBlue.5">{day}</Badge>
      {tasksIterations?.map((iteration) => (
        <CalendarTask key={iteration.uuid} iteration={iteration} />
      ))}
    </div>
  );
}
