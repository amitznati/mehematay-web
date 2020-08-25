import React from 'react';
import {Calendar, DailyTimeLine } from 'az-ui-library';
import SearchLocation from '../../../SearchLocation/widget/SearchLocation.connect';

export default function DayTimesMainView({dayTimes, onDateChange, selectedDate, onSelectLocation, selectedLocation}) {
  return (
    <div>
      <div>
        <SearchLocation onSelectLocation={onSelectLocation} selectedLocation={selectedLocation} />
        <Calendar selectedDate={selectedDate} onSelectDate={onDateChange} />
      </div>
      <DailyTimeLine dayTimes={dayTimes} />
    </div>
  );
}
