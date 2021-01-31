import { LOGIN_ERROR } from '../../constants/errors';

export const loginErrorSelector = (state) => state && state.session && state.session.errors && state.session.errors[LOGIN_ERROR];
