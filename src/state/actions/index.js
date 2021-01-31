import {
  REQUEST_LOGIN_ACTION,
  REQUEST_LOGIN_ACTION_SUCCESS,
  REQUEST_LOGIN_ACTION_FAILURE,
} from './actionTypes';

export const createAction = (type, payload, options) => ({ type, payload, options });

export const requestLoginAction = (email, password, rememberOption) => createAction(REQUEST_LOGIN_ACTION, { email, password, rememberOption });

export const requestLoginActionSuccess = (user) => createAction(REQUEST_LOGIN_ACTION_SUCCESS, user);

export const requestLoginActionFailure = (error) => createAction(REQUEST_LOGIN_ACTION_FAILURE, error);
