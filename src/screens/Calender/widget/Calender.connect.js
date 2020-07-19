import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import CalenderComponent from './Calender.component';
const calenderApi = getInstance().CalenderApi;

const mapStateToProps = () => {
  return {
    calenderYear : calenderApi.getCalenderYearSelector(),
    navigationDate: calenderApi.getNavigationDateSelector()
  };
};

const mapDispatchToProps = () => ({
  loadCalender: calenderApi.loadCalender,
  onSelectDate: calenderApi.onSelectDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalenderComponent);
