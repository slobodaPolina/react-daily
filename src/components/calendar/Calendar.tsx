import { formatWeekDay, orderedWeekDays } from '../../types/week-days.ts';
import { getCalendarDays } from '../../utils/time.ts';
import './Calendar.scss';

const getHeaderTemplate = (label: string) => (
  <div className="header-wrapper">{label}</div>
);
const getDayTemplate = (day?: number) => {
  const dayFragment = day ? <span className="day-number">{day}</span> : null;
  return <div className="day-wrapper">{dayFragment}</div>;
};

// todo: Each child in a list should have a unique "key" prop
// todo tests
function Calendar() {
  const columns = orderedWeekDays.map(formatWeekDay).map(getHeaderTemplate);
  const days = getCalendarDays(new Date(), orderedWeekDays).map(getDayTemplate);

  return (
    <div className="calendar-wrapper">
      {columns}
      {days}
    </div>
  );
}

export default Calendar;
