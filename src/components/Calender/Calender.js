import React from 'react';

import CardsSwift from '../CardsSwift/CardsSwift';
import {heDaysLong, monthsArrayHe} from '../../commonComponents/constants';
import './Calender.scss';

const CalenderDay = ({day, onSelectDate}) => {
  const className = [
    'day',
    day.isDisable ? 'day--disabled' : '',
    day.isSelected ? 'day--selected' : '',
    day.isToday ? 'day--today' : ''
  ];
  return (
    <div
      onClick={() => onSelectDate(new Date(day.date.year, day.date.month - 1, day.date.day))}
      className={className.join(' ')}
    >
      <span>{day.date.day}</span>
      <span>{day.heDate}</span>
      <span>{day.eventText}</span>
    </div>
  );
};
const CalenderWeek = ({week, onSelectDate}) => {
  return (
    <div className="calendar-week">
      {week.map((day) => <CalenderDay key={day.date.day} {...{day, onSelectDate}} />)}
    </div>
  );
};

const renderCalender = (weeks, month, onSelectDate) => {
  return (
    <div className="calendar-month">
      <div className="calendar-header">
        <span className="calendar-header-month">{monthsArrayHe[weeks[2][0].date.month]}</span>
        <p className="calendar-header-year">2018</p>
      </div>
      <div className="calendar-week calendar-week-days">
        {heDaysLong.map(day => (<span key={day} className="day-name">{day}</span>))}
      </div>
      {weeks.map((week, i) => <CalenderWeek key={`week-${i}`} {...{week, onSelectDate}} />)}
    </div>
  );
};
const Calender = ({ calenderYear, onSelectDate, navigationDate }) => {
  const [activeMonth, setActiveMonth] = React.useState(2);
  return (
    <div className="calendar-container">
      <div className="calender-sidebar">
        {monthsArrayHe.map((month, index) => (
          <div
            onClick={() => setActiveMonth(index)}
            className="calender-sidebar-month"
            key={month}
          >
            {month}
          </div>
        ))}
      </div>
      <CardsSwift
        data={calenderYear}
        activeIndex={activeMonth}
        renderItem={(weeks, index) => renderCalender(weeks, monthsArrayHe[index], onSelectDate)}
      >
      </CardsSwift>
    </div>
  );
};
export default Calender;
