import { createStore as mockedCreateStore, applyMiddleware as mockedApplyMiddleware, compose as mockedCompose } from 'redux';
import { createLogger as mockedCreateLogger } from 'redux-logger';

import { configureStore } from './index';

jest.mock('redux');
jest.mock('redux-logger');

describe('STATE - Store', () => {
  const devToolsComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const mockedComposerReturn = 'mockedComposerReturn';
  const mockedApplyMiddlewareReturn = 'mockedApplyMiddlewareReturn';
  const mockedStoreReturn = 'mockedStoreReturn';
  const mockLogger = 'mockLogger';

  const mockedComposer = jest.fn();

  beforeAll(() => {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = mockedComposer;
  });

  afterAll(() => {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = devToolsComposer;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Middlewares are added in dev', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    mockedCreateLogger.mockImplementation(() => mockLogger);
    mockedApplyMiddleware.mockImplementation(() => mockedApplyMiddlewareReturn);
    mockedCreateStore.mockImplementation(() => mockedStoreReturn);
    mockedComposer.mockImplementation(() => mockedComposerReturn);

    const store = configureStore();

    expect(store).toEqual(mockedStoreReturn);
    expect(mockedComposer).toHaveBeenCalledWith(mockedApplyMiddlewareReturn);
    expect(mockedCreateLogger).toHaveBeenCalledWith({ collapsed: true });

    process.env.NODE_ENV = originalEnv;
  });

  test('Middlewares are added in local', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'local';

    mockedCreateLogger.mockImplementation(() => mockLogger);
    mockedApplyMiddleware.mockImplementation(() => mockedApplyMiddlewareReturn);
    mockedCreateStore.mockImplementation(() => mockedStoreReturn);
    mockedComposer.mockImplementation(() => mockedComposerReturn);

    const store = configureStore();

    expect(store).toEqual(mockedStoreReturn);
    expect(mockedComposer).toHaveBeenCalledWith(mockedApplyMiddlewareReturn);
    expect(mockedCreateLogger).toHaveBeenCalledWith({ collapsed: true });

    process.env.NODE_ENV = originalEnv;
  });

  test('redux-logger is not added', () => {
    mockedCreateStore.mockImplementation(() => mockedStoreReturn);
    mockedCompose.mockImplementation(() => mockedComposerReturn);
    mockedApplyMiddleware.mockImplementation(() => mockedApplyMiddlewareReturn);

    const store = configureStore();

    expect(store).toEqual(mockedStoreReturn);
    expect(mockedCreateLogger).not.toHaveBeenCalled();
    expect(mockedComposer).not.toHaveBeenCalled();
  });
});
