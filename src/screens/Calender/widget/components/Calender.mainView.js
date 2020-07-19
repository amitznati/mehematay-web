import React from 'react';
import Calender from '../../../../components/Calender/Calender';


export default function CalenderMainView({calenderYear, onSelectDate}) {
  return <Calender {...{calenderYear, onSelectDate}} />;
}
