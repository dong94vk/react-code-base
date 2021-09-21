import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setThemeColor } from 'redux/persist/uiSetting';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';

const Home = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const setTheme = (theme) => {
    dispatch(setThemeColor(theme));
  };
  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="home-page">
      <h3>Home</h3>
      <button onClick={() => changeLanguage('vn')}>tiếng việt</button>
      <button onClick={() => changeLanguage('en')}>tiếng anh</button>
      <button onClick={() => setTheme('black')}>{t('setBlackTheme')}</button>
      <br />
      <br />
      <button onClick={() => setTheme('white')}>Set theme to white</button>
    </div>
  );
};

export default Home;
