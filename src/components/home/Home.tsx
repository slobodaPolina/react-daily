import { Calendar } from '../calendar/Calendar.tsx';
import { DayInfo } from '../day/DayInfo.tsx';
import { EditTask } from '../edit-task/EditTask.tsx';
import classes from './Home.module.scss';

export function Home() {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.mainArea}>
        <Calendar />

        <div className={classes.actionButtons}>
          <EditTask />
        </div>
      </div>
      <div className={classes.secondaryArea}>
        <DayInfo />
      </div>
    </div>
  );
}
