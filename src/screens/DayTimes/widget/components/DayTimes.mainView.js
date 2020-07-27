import React from 'react';
import {Calendar} from 'az-ui-library';

export default function DayTimesMainView() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <div style={{margin: 'auto'}}>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
    </div>
  );
}
