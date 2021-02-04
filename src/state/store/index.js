import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import { createLogger } from 'redux-logger';

const configureStore = () => {
  const middlewares = [];
  let devToolsCompose;

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
    devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const compose = devToolsCompose || reduxCompose;

  const store = createStore(
    compose(applyMiddleware(...middlewares)),
  );

  return store;
};

export { configureStore };
