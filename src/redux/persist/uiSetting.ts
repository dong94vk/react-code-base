const SET_THEME_COLOR = 'uiSetting/SET_THEME_COLOR';

export const setThemeColor = (color: string) => {
  return (dispatch) => {
    dispatch({
      type: SET_THEME_COLOR,
      payload: {
        theme: color,
      },
    });
  };
};


export interface UiSettingState {
  theme: string;
}

const uiSettingInitialState: UiSettingState = {
  theme: 'black',
};

export const uiSettingReducer = (
  state: UiSettingState = uiSettingInitialState,
  action: any
) => {
  const { type, payload = {} } = action;
  switch (type) {
    case SET_THEME_COLOR:
      return { ...state, ...payload };
    default:
      return state;
  }
};
