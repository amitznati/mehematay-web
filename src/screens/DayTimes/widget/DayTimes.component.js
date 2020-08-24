import React from 'react';
import DayTimesMainView from './components/DayTimes.mainView';

export default function DayTimesComponent(props) {
  React.useEffect(() => {
    props.loadSunTimesCurrentLocation();
  }, []);
  return (
    <DayTimesMainView {...props} />
  );
}
