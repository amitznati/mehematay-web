import CalenderApi from './api/CalenderApi';
import CalenderReducer from './api/CalenderReducer';
import CalenderConfig from './api/CalenderConfig';

export const widget = {
  api: CalenderApi,
  reducer: CalenderReducer,
  config: CalenderConfig,
};

export default widget;
