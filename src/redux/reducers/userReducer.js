import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

// initial state for userReducer NOT for global state (user: userReducer in combineReducer objenct)
const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notification: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
