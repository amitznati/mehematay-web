import BaseApi from '../../../sdk/BaseApi';
import selectors from './WidgetTemplateSelectors';

export const ActionTypes = {
  UPDATE_DATA: 'UPDATE_DATA',
};
export default class WidgetTemplateApi extends BaseApi {
  updateData = data => {
    this.dispatchStoreAction(ActionTypes.UPDATE_DATA, data);
  };

  getDataSelector = () => {
    return selectors.getDataSelector(this.store.getState());
  };
}
