import { LOGIN_ERROR } from '../../constants/errors';
import { REQUEST_LOGIN_ACTION_SUCCESS, REQUEST_LOGIN_ACTION_FAILURE } from '../actions/actionTypes';

import rootReducer from './index';
import sessionReducer from './session';

describe('STATE - Reducers', () => {
  const initialSessionState = {
    user: null,
    errors: {},
  };

  test('reducers are combined successfully', () => {
    // WIP: improve this test
    expect(rootReducer).toBeDefined();
  });

  test('sessionReducer - returns initial state', () => {
    const mockedAction = { type: 'some type of action' };
    expect(sessionReducer(undefined, mockedAction)).toEqual(initialSessionState);
  });

  test('sessionReducer - returns state after user logins successfully', () => {
    const mockedUserData = 'mockedUserData';
    const mockedAction = {
      type: REQUEST_LOGIN_ACTION_SUCCESS,
      payload: mockedUserData,
    };

    const expectedState = {
      ...initialSessionState,
      user: mockedUserData,
    };

    expect(sessionReducer(initialSessionState, mockedAction)).toEqual(expectedState);
  });

  test('sessionReducer - returns state after user logins with error', () => {
    const mockedError = 'mockedError';
    const mockedAction = {
      type: REQUEST_LOGIN_ACTION_FAILURE,
      payload: mockedError,
    };

    const expectedState = {
      ...initialSessionState,
      errors: {
        [LOGIN_ERROR]: mockedError,
      },
    };

    expect(sessionReducer(initialSessionState, mockedAction)).toEqual(expectedState);
  });
});
