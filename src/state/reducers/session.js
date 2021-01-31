import { LOGIN_ERROR } from '../../constants/errors';
import { REQUEST_LOGIN_ACTION_SUCCESS, REQUEST_LOGIN_ACTION_FAILURE } from '../actions/actionTypes';

const initialState = {
  user: null,
  errors: {},
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_ACTION_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case REQUEST_LOGIN_ACTION_FAILURE:
      return {
        ...state,
        errors: {
          [LOGIN_ERROR]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default sessionReducer;
