import { LOGIN_ERROR } from '../../constants/errors';

import { loginErrorSelector } from './index';

describe('STATE - Selectors', () => {
  test('login error', () => {
    const mockedError = 'mockedError';
    const mockedState = {
      session: {
        errors: {
          [LOGIN_ERROR]: mockedError,
        },
      },
    };

    const returnValue = loginErrorSelector(mockedState);
    expect(returnValue).toEqual(mockedError);
  });
});
