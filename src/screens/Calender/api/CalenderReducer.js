import {ActionTypes} from './CalenderApi';
const initialState = {
  calenderYear: [],
  selectedDate: new Date(),
  navigationDate: new Date()
};
// const SUCCESS = '_SUCCESS';
const reducer = (state = initialState, action) => {
  let newState = {...state};
  const payload = action && action.payload;
  const type = action && action.type;
  switch (type) {
  case ActionTypes.SET_SELECTED_DATE:
    newState = {
      ...state,
      selectedDate: payload,
    };
    break;
  case ActionTypes.SET_NAVIGATION_DATE:
    newState = {
      ...state,
      navigationDate: payload,
    };
    break;
  case ActionTypes.SET_CALENDER_YEAR:
    newState = {
      ...state,
      calenderYear: payload,
    };
    break;
  default:
    return newState;
  }
  return newState;
};

export default reducer;
