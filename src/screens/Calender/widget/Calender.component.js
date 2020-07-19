import React from 'react';
import CalenderMainView from './components/Calender.mainView';
import {mapComponentProps} from './Calender.propsMappar';

export default function CalenderComponent(props) {
  React.useEffect(() => {props.loadCalender();}, []);
  if (!props.calenderYear.length) {
    return <div >loading...</div>;
  }
  return <CalenderMainView {...mapComponentProps(props)} />;
}
