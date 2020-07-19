import {createSelector} from 'reselect';
import config from './CalenderConfig';

const sliceSelector = state => state[config.sliceName];

export const getNavigationDateSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.navigationDate;
  },
);

export const getSelectedDateSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.selectedDate;
  },
);

export const getCalenderYearSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.calenderYear;
  },
);

export default {
  getNavigationDateSelector,
  getSelectedDateSelector,
  getCalenderYearSelector
};
