import { Calendar } from '../calendar/Calendar.tsx';
import { DayInfo } from '../day/DayInfo.tsx';
import classes from './Home.module.scss';
import { AddTaskBtn } from '../edit-task/AddTaskBtn.tsx';

export function Home() {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.mainArea}>
        <Calendar />

        <div className={classes.actionButtons}>
          <AddTaskBtn size="xl" />
        </div>
      </div>
      <div className={classes.secondaryArea}>
        <DayInfo />
      </div>
    </div>
  );
}
