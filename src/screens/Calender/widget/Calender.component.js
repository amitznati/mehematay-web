import React from 'react';
import CalenderMainView from './components/Calender.mainView';
import {mapComponentProps} from './Calender.propsMappar';

export default class CalenderComponent extends React.Component {
  componentDidMount() {
    this.props.loadCalender();
  }
  render() {

    if (!this.props.calenderYear.length) {
      return <div>loading...</div>;
    }
    return <CalenderMainView {...mapComponentProps(this.props)} />;
  }
}
