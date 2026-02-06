import { Badge } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectTasksByDay } from '../../stores/task.store.ts';
import { getCurrentMonthDay } from '../../utils/time.ts';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const date = getCurrentMonthDay(day);
  const tasks = useSelector(selectTasksByDay(date));

  return (
    <>
      <Badge color="deepBlue.5">{day}</Badge>
      <div>{JSON.stringify(tasks)}</div>
    </>
  );
}
