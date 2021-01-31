
import {
  createAction,
  requestLoginAction,
  requestLoginActionSuccess,
  requestLoginActionFailure,
} from './index';

import {
  REQUEST_LOGIN_ACTION,
  REQUEST_LOGIN_ACTION_SUCCESS,
  REQUEST_LOGIN_ACTION_FAILURE,
} from './actionTypes';

describe('STATE - Actions', () => {
  test('createAction', () => {
    const mockedType = 'mockedType';
    const mockedPayload = 'mockedPayload';
    const mockedOptions = 'mockedOptions';

    const expected = {
      type: mockedType,
      payload: mockedPayload,
      options: mockedOptions,
    };

    expect(createAction(mockedType, mockedPayload, mockedOptions)).toEqual(expected);
  });

  test('requestLoginAction', () => {
    const mockedEmail = 'mockedEmail';
    const mockedPassword = 'mockedPassword';
    const mockedRememberOption = true;

    const action = requestLoginAction(mockedEmail, mockedPassword, mockedRememberOption);
    const expectedAction = {
      type: REQUEST_LOGIN_ACTION,
      payload: {
        email: mockedEmail,
        password: mockedPassword,
        rememberOption: true,
      },
      options: undefined,
    };

    expect(action).toEqual(expectedAction);
  });

  test('requestLoginActionSuccess', () => {
    const mockedUser = 'mockedUser';

    const action = requestLoginActionSuccess(mockedUser);
    const expectedAction = {
      type: REQUEST_LOGIN_ACTION_SUCCESS,
      payload: mockedUser,
      options: undefined,
    };

    expect(action).toEqual(expectedAction);
  });

  test('requestLoginActionFailure', () => {
    const mockedError = 'mockedError';

    const action = requestLoginActionFailure(mockedError);
    const expectedAction = {
      type: REQUEST_LOGIN_ACTION_FAILURE,
      payload: mockedError,
      options: undefined,
    };

    expect(action).toEqual(expectedAction);
  });
});
