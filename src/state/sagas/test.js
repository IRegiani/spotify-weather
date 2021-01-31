import { runSaga } from 'redux-saga';
import rootSaga from './index';

import { requestLoginAction, requestLoginActionSuccess, requestLoginActionFailure } from '../actions';

import { login } from '../../api/spotify';
import { fetchAuthentication } from './auth';

jest.mock('../../api/spotify');

const executeSaga = (sagas, triggerAction) => {
  const dispatched = [];

  runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({ }),
  }, sagas, triggerAction);

  return dispatched.length === 1 ? dispatched[0] : dispatched;
};

describe('STATE - Sagas', () => {
  const mockUser = {
    name: 'dummy name',
    token: 'dummy token ',
  };

  test('rootSaga', () => {
    expect(executeSaga(rootSaga)).toEqual([]);
  });

  test('fetchAuthentication successfully', () => {
    const mockUserEmail = 'mockUserEmail';
    const mockUserPassword = 'mockUserPassword';

    login.mockImplementation(() => mockUser);
    const triggerAction = requestLoginAction(mockUserEmail, mockUserPassword);
    const expectedAction = requestLoginActionSuccess(mockUser);

    const action = executeSaga(fetchAuthentication, triggerAction);

    expect(action).toEqual(expectedAction);
  });

  test('fetchAuthentication on error', () => {
    const mockError = 'mockError';

    login.mockImplementation(() => { throw Error(mockError); });
    const triggerAction = requestLoginAction(mockUser);
    const expectedAction = requestLoginActionFailure(mockError);

    const action = executeSaga(fetchAuthentication, triggerAction);

    expect(action).toEqual(expectedAction);
  });
});
