import React from 'react';
import {Calendar, DailyTimeLine, SearchLocation } from 'az-ui-library';

export default function DayTimesMainView({dayTimes}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <div>
      <div>
        <SearchLocation onSearch={() => {}} onSelectLocation={() => {}} />
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>
      <DailyTimeLine dayTimes={dayTimes} />
    </div>
  );
}
