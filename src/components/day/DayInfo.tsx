import classes from './DayInfo.module.scss';
import { useSelector } from 'react-redux';
import { selectDay } from '../../stores/day.store.ts';
import { Paper } from '@mantine/core';

export function DayInfo() {
  const selectedDay = useSelector(selectDay);

  return (
    <Paper className={classes.dayContainer} shadow="md" radius="md" p="xl">
      {selectedDay}
    </Paper>
  );
}
