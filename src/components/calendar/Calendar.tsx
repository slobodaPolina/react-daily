import { formatWeekDay, orderedWeekDays } from '../../types/week-days.ts';
import { getCalendarDays } from '../../utils/time.ts';
import './Calendar.scss';

const getHeaderTemplate = (label: string) => (
  <div className="header-wrapper" key={label}>
    {label}
  </div>
);
const getDayTemplate = (index: number, day?: number) => {
  const dayFragment = day ? <span className="day-number">{day}</span> : null;
  return (
    <div className="day-wrapper" key={index}>
      {dayFragment}
    </div>
  );
};

function Calendar() {
  const columns = orderedWeekDays.map(formatWeekDay).map(getHeaderTemplate);
  const days = getCalendarDays(new Date(), orderedWeekDays).map((day, index) =>
    getDayTemplate(index, day),
  );

  return (
    <div className="calendar-wrapper">
      {columns}
      {days}
    </div>
  );
}

export default Calendar;
