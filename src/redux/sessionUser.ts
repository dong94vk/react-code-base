import * as request from 'api/request';
import { requestAxios } from 'redux/api';

export const FETCH_SESSION_USER = 'user/FETCH_SESSION_USER';
const DELETE_SESSION_USER = 'user/DELETE_SESSION_USER';

export interface SessionUserState {
  authChecked: boolean;
  me: any;
}
const initialState = {
  authChecked: false,
  me: null,
};

export function fetchSessionUser() {
  return (dispatch) => {
    dispatch(requestAxios(request.getUserMe({})))
      .then((response) => {
        dispatch({
          type: FETCH_SESSION_USER,
          payload: { me: response, authChecked: true },
        });
      })
      .catch(() => {
        dispatch({
          type: FETCH_SESSION_USER,
          payload: { ...initialState, authChecked: true },
        });
      });
  };
}

export function killSessionUser(cb = null) {
  return (dispatch) => {
    // Todo call api logout
    dispatch({
      type: DELETE_SESSION_USER,
      payload: initialState,
    });
    cb && cb(true);
  };
}

export const sessionUserReducer = (
  state: SessionUserState = initialState,
  action
) => {
  const { type, payload = {} } = action;
  switch (type) {
    case FETCH_SESSION_USER:
    case DELETE_SESSION_USER:
      return { ...payload };
    default:
      return state;
  }
};
