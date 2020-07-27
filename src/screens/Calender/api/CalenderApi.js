import BaseApi from '../../../sdk/BaseApi';
import selectors from './CalenderSelectors';
import Hebcal from 'hebcal';
import {monthsArrayHe} from '../../../commonComponents/constants';

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
    startDate.setMonth(startDate.getMonth() - 2);
    const today = new Date();

    const year = [];
    Hebcal.range(0, 4).forEach((/*month*/) => {
      const startMonth = startDate.getMonth();
      startDate.setDate(1);
      startDate.setDate(0 - startDate.getDay());
      const weekDay = [];
      Hebcal.range(0, 5).forEach((/*week*/) => {
        console.log(startMonth);
        weekDay.push(
          Hebcal.range(0, 6).map(() => {
            startDate.setDate(startDate.getDate() + 1);
            const day = this.getWeekDays(startDate, today);
            day.isDisable = startDate.getMonth() !== startMonth;
            return day;
          })
        );
      });
      year.push(weekDay);
    });

    this.setCalenderYear(year);
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

  getWeekDays = async (startDate, today) => {
    const selectedDate = this.getSelectedDateSelector();
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
