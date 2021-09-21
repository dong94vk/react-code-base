import { applyMiddleware, compose, createStore, Store } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import { state, State } from './reducer';

const persistConfig = {
  key: 'box-social-web',
  storage,
  whitelist: ['uiSetting'],
};

const debugMode = !!window.location.search.match(/debug/gi);

const middlewares = [reduxThunk];
if (debugMode) {
  middlewares.push(logger);
}

const configureStore = (module = null) => {
  const reducer = persistReducer(persistConfig, state);
  const store: Store<State> = createStore(
    reducer,
    compose(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore