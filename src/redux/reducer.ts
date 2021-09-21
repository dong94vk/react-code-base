import { ApiEntity } from 'common/types';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { sessionUserReducer, SessionUserState } from 'redux/sessionUser';
import { UiSettingState, uiSettingReducer } from './persist/uiSetting';
import { apiReducer } from './api';

export interface State {
  api: ApiEntity;
  form: any;
  sessionUser: SessionUserState;
  uiSetting: UiSettingState;
}

export const state = combineReducers<State>({
  api: apiReducer,
  form: formReducer,
  sessionUser: sessionUserReducer,
  uiSetting: uiSettingReducer,
});
