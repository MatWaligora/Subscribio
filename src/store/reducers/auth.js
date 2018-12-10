import * as actionTypes from '../actions/actionTypes';
import * as errorCodes from '../../utils/errorCodes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = ( state, action ) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };
};

const authFail = (state, action) => {
  let message = '';
  switch(action.error.message) {
    case errorCodes.EMAIL_EXISTS: message = 'User with this email already exists'; break;
    case errorCodes.EMAIL_NOT_FOUND: message = 'Email not found'; break;
    case errorCodes.INVALID_PASSWORD: message = 'Invalid password'; break;
  }
  return {...state,
    error: message,
    loading: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null
  };
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
