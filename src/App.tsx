import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorPage from 'components/errorPage';
import Loading from 'components/ui/loading';
import Layout from './containers/Layout';
import configureStore from 'redux/configureStore';
import Routes from './routes';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const { store } = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router>
      <I18nextProvider i18n={i18n}>
        <Layout>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {Routes.map((route, index) => {
                return (
                  <Route
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              })}
              <Route component={ErrorPage} />
            </Switch>
          </React.Suspense>
        </Layout>
      </I18nextProvider>
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
