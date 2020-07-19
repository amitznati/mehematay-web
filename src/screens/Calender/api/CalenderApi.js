import BaseApi from '../../../sdk/BaseApi';
import selectors from './CalenderSelectors';
import Hebcal from 'hebcal';
// eslint-disable-next-line no-unused-vars
import {monthsArray, monthsArrayHe} from '../../../commonComponents/constants';

export const ActionTypes = {
  SET_NAVIGATION_DATE: 'SET_NAVIGATION_DATE',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_CALENDER_YEAR: 'SET_CALENDER_YEAR'
};
export default class CalenderApi extends BaseApi {
  onSelectDate = async date => {
    const {setSelectedDate, setNavigationDate} = this;
    setSelectedDate(date);
    setNavigationDate(date);
    await this.loadCalender();
  };

  loadCalender = async () => {
    const navigationDate = this.getNavigationDateSelector();
    const startDate = new Date(navigationDate);
    const startMonth = startDate.getMonth();
    startDate.setDate(1);
    startDate.setDate(0 - startDate.getDay());
    const today = new Date();
    let cont = true;
    const year = [];
    Hebcal.range(0, 11).forEach(() => {
      const weekDay = [];
      while (cont) {
        weekDay.push(
          Hebcal.range(0, 6).map(() => {
            startDate.setDate(startDate.getDate() + 1);
            return this.getWeekDays(startDate, today);
          })
        );
        cont = startDate.getMonth() <= startMonth;
      }
      year.push(weekDay);
    });

    this.setCalenderYear(year);
    //const id = setTimeout( () => {this.setCalenderWeeks(weekDay); clearTimeout(id);console.log('done loading cal');}, 5000);
  };

  getEventText = (heDate) => {
    const events = new Hebcal(heDate.year).holidays[heDate.toString()] || [];
    const newEvent = events.filter(
      e => (heDate.il && !e.CHUL_ONLY) || !heDate.il,
    );
    const eventText = newEvent.find(ev => ev.desc[2] !== 'ערב שבת');
    let text = eventText && eventText.desc[2];
    if (text === 'שבת') {
      text = heDate.getSedra('h').join(' ');
    }
    if (text && text.includes('ראש חודש')) {
      text = text.replace(
        'ראש חודש',
        `${monthsArrayHe[heDate.next().month - 1]} `,
      );
    }
    return text;
  };

  getWeekDays = (startDate, today) => {
    const navigationDate = this.getNavigationDateSelector();
    const selectedDate = this.getSelectedDateSelector();
    const isDisable = startDate.getMonth() !== navigationDate.getMonth();
    const date = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };
    const isSelected =
        selectedDate.getFullYear() === startDate.getFullYear() &&
        selectedDate.getMonth() === startDate.getMonth() &&
        selectedDate.getDate() === startDate.getDate();
    const isToday =
        today.getFullYear() === startDate.getFullYear() &&
        today.getMonth() === startDate.getMonth() &&
        today.getDate() === startDate.getDate();
    // !isDisable && startDate.setDate(startDate.getDate() + 1);
    const eventText = this.getEventText(new Hebcal.HDate(startDate));
    const HDate = new Hebcal.HDate(startDate);
    return {
      date,
      isToday,
      isSelected,
      isDisable,
      eventText,
      heDate: Hebcal.gematriya(HDate.day),
      onSelect: this.onSelectDate,
    };
  };

  setCalenderYear = year => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_CALENDER_YEAR,
      payload: year,
    });
  }


  setSelectedDate = selectedDate => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  setNavigationDate = navigationDate => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_NAVIGATION_DATE,
      payload: navigationDate,
    });
  };

  getSelectedDateSelector = () => {
    return selectors.getSelectedDateSelector(this.store.getState());
  };

  getNavigationDateSelector = () => {
    return selectors.getNavigationDateSelector(this.store.getState());
  };

  getCalenderYearSelector = () => {
    return selectors.getCalenderYearSelector(this.store.getState());
  };
}
