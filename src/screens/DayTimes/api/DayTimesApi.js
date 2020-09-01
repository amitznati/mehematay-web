// import * as Location from 'expo-location';
import moment from 'moment-timezone';
import Hebcal from 'hebcal';
import BaseApi from '../../../sdk/BaseApi';
import selectors from './DayTimesSelectors';
import {monthsArray, monthsArrayHe, heDaysLong} from '../../../commonComponents/constants';

export const ActionTypes = {
  LOAD_SUN_TIMES: 'LOAD_SUN_TIMES',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  LOAD_CURRENT_LOCATION_TIMES_ERROR: 'LOAD_CURRENT_LOCATION_TIMES_ERROR',
  SET_NAVIGATION_DATE: 'SET_NAVIGATION_DATE',
};

const dayTimesTemplateObj = [
  {key: 'dayHour', title: 'שעה זמנית הגר"א'},
  {key: 'alotHashahar90', title: 'עלות השחר 90 דקות'},
  {key: 'alotHashahar72', title: 'עלות השחרת 72 דקות'},
  {key: 'misheyakir', title: 'זמן משיכיר'},
  {key: 'sunrise', title: 'זריחה (הנץ)', inDay: true},
  {key: 'sofZmanShma', title: 'סוף זמן ק"ש', inDay: true},
  {key: 'sofZmanTfila', title: 'סוף זמן תפילה', inDay: true},
  {key: 'hazot', title: 'חצות היום והלילה', inDay: true},
  {key: 'minhaGdola', title: 'מנחה גדולה', inDay: true},
  {key: 'minhaKtana', title: 'מנחה קטנה', inDay: true},
  {key: 'plagMinha', title: 'פלג מנחה', inDay: true},
  {key: 'sunset', title: 'שקיעה'},
  {key: 'tzetHakohavim', title: 'צאת הכוכבים'},
  {key: 'tzetHakohavimRT', title: 'צאת הכוכבים ר"ת'},
];
export default class DayTimesApi extends BaseApi {
  loadSunTimes = async (coords, date) => {
    const heDate = new Hebcal.HDate(date);
    heDate.setLocation(coords.latitude, coords.longitude);
    const res = {
      sunrise: heDate.sunrise(),
      sunset: heDate.sunset(),
    };
    const payload = this.getDayTimesPerAgra(res);
    this.dispatchStoreAction({
      type: ActionTypes.LOAD_SUN_TIMES,
      payload,
    });
  };

  addMinutes = (dt, minutes) => {
    return new Date(dt.getTime() + minutes * 60000);
  };
  addHours = (dt, hours) => {
    return new Date(dt.getTime() + hours * 3600000);
  };

  getDayTimesPerAgra = res => {
    const {addMinutes, addHours} = this;
    const getDayHourDate = dayHourRatio => {
      return moment(1120780800000 + dayHourRatio * 3600000).tz('Etc/GMT+0');
    };
    const location = this.getSelectedLocationSelector();
    const {sunrise, sunset} = res;
    const retVal = {};
    retVal.sunrise = new Date(sunrise);
    retVal.sunset = new Date(sunset);
    const dayHourRatio = (retVal.sunset - retVal.sunrise) / 1000 / 60 / 60 / 12;
    retVal.dayHour = getDayHourDate(dayHourRatio);
    retVal.alotHashahar90 = addMinutes(retVal.sunrise, dayHourRatio * -90);
    retVal.alotHashahar72 = addMinutes(retVal.sunrise, dayHourRatio * -72);
    retVal.misheyakir = addMinutes(retVal.sunrise, dayHourRatio * -50);
    retVal.sofZmanShma = addHours(retVal.sunrise, dayHourRatio * 3);
    retVal.sofZmanTfila = addHours(retVal.sunrise, dayHourRatio * 4);
    retVal.hazot = addHours(retVal.sunrise, dayHourRatio * 6);
    retVal.minhaGdola = addMinutes(retVal.hazot, dayHourRatio * 30);
    retVal.minhaKtana = addHours(retVal.sunset, dayHourRatio * -2.5);
    retVal.plagMinha = addHours(retVal.sunset, dayHourRatio * -1.25);
    retVal.tzetHakohavim = addMinutes(retVal.sunset, dayHourRatio * 18);
    retVal.tzetHakohavimRT = addMinutes(retVal.sunset, dayHourRatio * 72);
    const retValWithTemplate = JSON.parse(JSON.stringify(dayTimesTemplateObj));
    Object.keys(retVal).forEach(field => {
      retValWithTemplate.find(t => t.key === field).time = moment(retVal[field])
        .tz(field === 'dayHour' ? 'Etc/GMT+0' : location.timezone)
        .format('HH:mm');
    });

    return retValWithTemplate;
  };

  getDateTime = dt => {
    const selectedLocation = this.getSelectedLocationSelector();
    return moment(dt)
      .tz(selectedLocation ? selectedLocation.timezone : 'Etc/GMT+0')
      .format('HH:mm');
  };

  getSelectedDateFormats = (
    selectedDate = this.APIsInstances.CalenderApi.getSelectedDateSelector(),
    isShort = false,
  ) => {
    const heDate = new Hebcal.HDate(selectedDate);
    const selectedLocation = this.getSelectedLocationSelector();
    let event = undefined;
    if (selectedLocation && selectedLocation.coords) {
      heDate.setLocation(
        selectedLocation.coords.latitude,
        selectedLocation.coords.longitude,
      );
    }
    const dayHolidays = heDate.holidays(heDate);
    if (dayHolidays.length) {
      const holiday = dayHolidays.find(
        h => (heDate.il && !h.CHUL_ONLY) || !heDate.il,
      );
      const desc = holiday && holiday.desc[2];
      if (desc) {
        if (desc.includes('שבת')) {
          event = `${desc} ${holiday.date
            .prev()
            .getSedra('h')
            .join(' ')}`;
        } else if (desc.includes('ראש חודש')) {
          event = desc.replace(
            'ראש חודש',
            `ראש חודש ${monthsArrayHe[holiday.date.next().month - 1]} `,
          );
        } else {
          event = desc;
        }
      }
    }
    return {
      formattedDate: `${selectedDate.getDate()} ${
        monthsArray[selectedDate.getMonth()]
      } ${isShort ? '' : selectedDate.getFullYear()}`,
      formattedDateHe: `יום ${heDaysLong[selectedDate.getDay()]}, ${Hebcal.gematriya(heDate.day)} ${
        monthsArrayHe[heDate.month - 1]
      } ${isShort ? '' : Hebcal.gematriya(heDate.year)}`,
      event,
    };
  };

  getFormattedDateForEvent = selectedDate => {
    const heDate = new Hebcal.HDate(selectedDate);
    return {
      formattedDate: `${selectedDate.getMonth()}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`,
      formattedDateHe: `${Hebcal.gematriya(heDate.day)} ${
        monthsArrayHe[heDate.month - 1]
      } ${Hebcal.gematriya(heDate.year)}`,
    };
  };

  getNextEvents = () => {
    const selectedDate = this.APIsInstances.CalenderApi.getSelectedDateSelector();
    const selectedLocation = this.getSelectedLocationSelector();
    const events = [];
    const nextData = new Date(selectedDate);
    const getEventTitle = holiday => {
      if (holiday.desc.includes('שבת')) {
        return `שבת הקרובה: ${holiday.date
          .prev()
          .getSedra('h')
          .join(' ')}`;
      }
      return `החג הקרוב: ${holiday.desc[2]}`;
    };
    const getEvent = (holiday, isJerusalem) => {
      const hDate = holiday.date;
      const dayHourRatio =
        (hDate.sunset() - hDate.sunrise()) / 1000 / 60 / 60 / 12;
      return {
        title: getEventTitle(holiday),
        date: this.getFormattedDateForEvent(new Date(hDate.greg())),
        enter: this.getDateTime(
          this.addMinutes(hDate.prev().sunset(), isJerusalem ? -40 : -20),
        ),
        out: this.getDateTime(
          this.addMinutes(hDate.sunset(), 40 * dayHourRatio),
        ),
      };
    };
    let more = true;
    let isJerusalem = false;
    while (more) {
      const heData = new Hebcal.HDate(nextData);
      if (selectedLocation && selectedLocation.coords) {
        heData.setLocation(
          selectedLocation.coords.latitude,
          selectedLocation.coords.longitude,
        );
        isJerusalem = ['Jerusalem', 'ירושלים'].includes(
          selectedLocation.formattedName,
        );
      }
      const dayHolidays = heData.holidays(heData);
      if (dayHolidays.length) {
        const holiday = dayHolidays.find(
          h => h.YOM_TOV_ENDS && ((h.date.il && !h.CHUL_ONLY) || !h.date.il),
        );
        if (holiday) {
          events.push(getEvent(holiday, isJerusalem));
        }
      }
      if (nextData.getDay() === 6) {
        more = false;
      }
      nextData.setDate(nextData.getDate() + 1);
    }
    return events;
  };

  onSearchMyLocation = () => {
    const successCallback = (location) => {
      localStorage.setItem('prevLocation', JSON.stringify(location));
      this.onSelectLocation(location);
    };
    const errorCallback = (error) => console.log(error);
    this.APIsInstances.SearchLocationApi.searchMyLocation(successCallback, errorCallback);
  }

  onSelectLocation = async location => {
    this.setSelectedLocation(location);
    await this.loadSunTimes(location.coords);
  };

  getExistLocationFromStorage = () => {
    const existingLocation = localStorage.getItem('prevLocation');
    if (existingLocation) {
      return JSON.parse(existingLocation);
    }
    return false;
  }

  loadSunTimesCurrentLocation = async () => {
    this.setSelectedDate(new Date());
    const existingLocationFromStorage = this.getExistLocationFromStorage();
    if (existingLocationFromStorage) {
      await this.onSelectLocation(existingLocationFromStorage);
    } else {
      this.onSearchMyLocation();
    }
  };

  onDateChange = async selectedDate => {
    this.setSelectedDate(selectedDate);
    const location = this.getSelectedLocationSelector();
    if (location && location.coords) {
      await this.loadSunTimes(location.coords, selectedDate);
    }
  };

  setSelectedDate = (selectedDate) => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_DATE,
      payload: selectedDate,
    });
  }

  setSelectedLocation = selectedLocation => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_LOCATION,
      payload: {selectedLocation},
    });
  };

  getDayTimesSelector = () => {
    return selectors.getDayTimesSelector(this.store.getState());
  };


  getSelectedLocationSelector = () => {
    return selectors.getSelectedLocationSelector(this.store.getState());
  };

  getSelectedDateSelector = () => {
    return selectors.getSelectedDateSelector(this.store.getState());
  }

  getLoadCurrentLocationTimesErrorSelector = () => {
    return selectors.getLoadCurrentLocationTimesErrorSelector(
      this.store.getState(),
    );
  };
}
