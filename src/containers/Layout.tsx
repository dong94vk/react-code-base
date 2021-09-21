import * as React from 'react';
import { GatewayDest, GatewayProvider } from 'react-gateway';
import { useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';
import { State } from 'redux/reducer';
import Header from 'components/ui/header';
import ErrorPage from 'components/errorPage'

import 'scss/main.scss';
import 'scss/blacktheme.scss';
import 'scss/whitetheme.scss';

interface Props {
  children?: any;
}

const Layout = (props: Props) => {
  const error = useSelector((state: State) => state.api.error);
  const themeName = useSelector((state: State) => state.uiSetting.theme);

  React.useEffect(() => {
    const scrollListener = () => {
      const scrollBtn = document.getElementById('scroll-top');
      const bodyScrollTop = document.body.scrollTop > 50;
      const elementScrollTop = document.documentElement.scrollTop > 50;
      scrollBtn.style.display =
        bodyScrollTop || elementScrollTop ? 'block' : 'none';
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);


  if (error && error.status === 403) {
    return (
      <div className={`bs-layout theme-${themeName}`}>
        <Header />
        <ErrorPage status={error.status} />
      </div>
    );
  }

  return (
    <GatewayProvider>
      <React.Fragment>
        <div className={`bs-layout theme-${themeName}`}>
          <Header />
          <div className="app-content content">
            <div className="content-wrapper">{props.children}</div>
            <a
              id="scroll-top"
              className="btn btn-warning"
              onClick={() => {
                Scroll.animateScroll.scrollToTop({ duration: 300 });
              }}
            >
              <i className="fa fa-arrow-circle-o-up"></i>
            </a>
          </div>

          <footer className="footer footer-static footer-light navbar-border fixed-bottom">
            <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
              <span className="float-md-left d-block d-md-inline-block">
                Copyright &copy; 2021{' '}
                <a
                  className="text-bold-800 grey darken-2"
                  href="https://box.studio"
                  target="_blank"
                >
                  Box Studio
                  </a>
                  , All rights reserved.
                </span>
            </p>
          </footer>
        </div>
        <GatewayDest name="overlay" />
      </React.Fragment>
    </GatewayProvider>
  );
};

export default Layout;
