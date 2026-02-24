import classes from './DayInfo.module.scss';
import { useSelector } from 'react-redux';
import { Paper, Text } from '@mantine/core';
import {
  formatDate,
  getCurrentDay,
  getCurrentMonthDate,
} from '../../utils/time.ts';
import {
  selectDay,
  selectTasksIterationsByDay,
} from '../../stores/selectors.ts';
import { DayTask } from './DayTask.tsx';

export function DayInfo() {
  const selectedDay = useSelector(selectDay);
  const tasksIterations = useSelector(selectTasksIterationsByDay(selectedDay));

  const formattedDate = formatDate(
    getCurrentMonthDate(selectedDay) ??
      (getCurrentMonthDate(getCurrentDay()) as Date),
  );

  return (
    <Paper className={classes.dayContainer} shadow="md" radius="md" p="xl">
      <Text fw={600}>{formattedDate}:</Text>

      {tasksIterations?.map((iteration) => (
        <DayTask key={iteration.uuid} iteration={iteration} />
      ))}
    </Paper>
  );
}
